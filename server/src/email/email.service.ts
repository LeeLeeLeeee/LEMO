import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        this.nodemailerTransport = createTransport({
            service: this.configService.get('EMAIL_SERVICE'),
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
    }

    sendVerificationLink(receipient: string) {
        const token = this.jwtService.sign(
            { receipient },
            {
                secret: this.configService.get('EMAIL_VERIFICATION_SECRET'),
                expiresIn: `${this.configService.get(
                    'EMAIL_VERIFICATION_EXPIRATION',
                )}s`,
            },
        );
        const url = `${this.configService.get(
            'EMAIL_CONFIRMATION_URL',
        )}?token=${token}`;
        const contentHtml = `
            <p>이메일 인증을 진행해주세요. (5분이 지날경우 다시 인증 메일을 받아주세요.)</p>
            <a style="-webkit-appearance: button;-moz-appearance: button;appearance: button;" href="${url}">인증</a>
        `;
        return this.nodemailerTransport.sendMail({
            to: receipient,
            subject: '이메일 인증 메일',
            html: contentHtml,
        });
    }

    confirmToken(token: string) {
        const { receipient } = this.jwtService.verify(token);
        console.log(receipient);
        return true;
    }
}
