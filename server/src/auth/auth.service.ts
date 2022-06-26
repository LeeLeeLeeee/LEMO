import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'const/postgresErrorCodes';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';

interface TokenPayload {
    userID: number;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prisima: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
    ) {}

    async register(data: Prisma.UserCreateInput): Promise<User> {
        const { password, ...rest } = data;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await this.prisima.user.create({
                data: {
                    ...rest,
                    password: hashedPassword,
                },
            } as any);
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    'Email already exists',
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    'Fail to Signup',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    async getAuthenticatedUser(email: string, password: string) {
        try {
            const user = await this.prisima.user.findUnique({
                where: { email },
            });
            await this.verifyPassword(password, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Fail to signIn', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(userID: number, password: string) {
        try {
            const user = await this.prisima.user.findUnique({
                where: { id: userID },
            });
            await this.verifyPassword(password, user.password);
            await this.prisima.user.delete({ where: { id: userID } });
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Fail to delete user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    private async verifyPassword(
        plainTextPassword: string,
        hashedPassword: string,
    ) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword,
        );

        if (!isPasswordMatching) {
            throw new HttpException('Wrong Passowrd', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userID: number) {
        const payload: TokenPayload = { userID };
        const accessToken = this.jwtService.sign(payload);
        /* TODO:: secure, Domain 속성 추가? */
        return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'ACCESS_TOKEN_EXPIRATION',
        )}`;
    }

    public getCookieWithRefreshJwtToken(userID: number) {
        const payload: TokenPayload = { userID };
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('REFRESH_TOKEN_EXPIRATION')}s`,
        });
        this.redisService.set(userID, refreshToken, {
            ttl: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
        });
        return `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'REFRESH_TOKEN_EXPIRATION',
        )}`;
    }

    public async clearJwtTokenCookie(userID) {
        await this.redisService.delete(userID);
        return [
            `Authentication=; HttpOnly; Path=/; Max-Age=${Date.now()}`,
            `refresh_token=; HttpOnly; Path=/; Max-Age=${Date.now()}`,
        ];
    }

    public async checkRefreshToken(refreshToken: string): Promise<any> {
        try {
            const { userID } = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            });
            const key = await this.redisService.get(userID);
            return key === refreshToken ? userID : null;
        } catch (error) {
            throw new HttpException(
                'Fail to sign out',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
