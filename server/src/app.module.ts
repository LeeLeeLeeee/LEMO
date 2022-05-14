import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JWTAuthenticationGuard } from 'auth/passport/jwt.guard';
import { JwtStrategy } from 'auth/passport/jwt.strategy';
import { LocalStrategy } from 'auth/passport/local.strategy';
import * as Joi from 'joi';

import { AppLoggerMiddleware } from 'logger.middleware';
import { join } from 'path';
import { PrismaService } from 'prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { RedisModule } from './redis/redis.module';

ConfigModule.forRoot({
    validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
    }),
});

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        PostModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'upload'),
            serveRoot: '/static',
            exclude: ['/api*'],
        }),
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
        RedisModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JWTAuthenticationGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
