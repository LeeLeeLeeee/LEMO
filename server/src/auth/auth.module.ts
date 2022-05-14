import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma.service';
import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';

@Module({
    imports: [
        RedisModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get(
                        'ACCESS_TOKEN_EXPIRATION',
                    )}s`,
                },
            }),
        }),
    ],
    providers: [AuthService, PrismaService, LocalStrategy, ConfigService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
