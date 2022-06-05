import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'decorator';
import { EmailConfirmationDto, EmaileDto } from './email.dto';
import EmailService from './email.service';

@Controller('email')
@ApiTags('email')
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
    @HttpCode(HttpStatus.OK)
    @Public()
    async confirm(@Body() confirmationData: EmailConfirmationDto) {
        const { token } = confirmationData;
        const email = this.emailService.confirmToken(token);
        return { email };
    }
}
