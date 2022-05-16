import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailController } from './email.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('EMAIL_VERIFICATION_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get(
                        'EMAIL_VERIFICATION_EXPIRATION',
                    )}s`,
                },
            }),
        }),
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
