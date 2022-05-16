import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { Public } from 'decorator';
import { EmailConfirmationDto, EmaileDto } from './email.dto';
import EmailService from './email.service';

@Controller('email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('send-email')
    @Public()
    async sendEmail(@Body() body: EmaileDto) {
        const { recipient } = body;
        this.emailService.sendVerificationLink(recipient);
    }

    @Post('email-confirm')
    @Public()
    async confirm(@Body() confirmationData: EmailConfirmationDto) {
        const { token } = confirmationData;
        this.emailService.confirmToken(token);
    }
}
