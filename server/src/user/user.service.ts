import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { Prisma, User as UserDto } from '@prisma/client';

type UpdateUserDto = Pick<
    UserDto,
    'description' | 'githubLink' | 'name' | 'profileImage'
>;

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getSelf(userID: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userID,
                },
            });
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Fail to get user', HttpStatus.BAD_REQUEST);
        }
    }

    async updateUser(props: Prisma.UserUpdateArgs) {
        try {
            const user = await this.prisma.user.update(props);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException(
                'Fial to update user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
