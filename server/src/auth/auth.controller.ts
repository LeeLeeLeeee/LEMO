import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from 'decorator';
import { Response } from 'express';
import { CreateUserDto } from 'interfaces';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './passport/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        const { email, name, password } = userData;
        await this.authService.register({ email, name, password });
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthenticationGuard)
    @Post('signIn')
    async signIn(
        @Req() request: { user: User } & Request,
        @Res() response: Response,
    ) {
        const { user } = request;
        const accessCookie = this.authService.getCookieWithJwtToken(user.id);
        const refreshCookie = this.authService.getCookieWithRefreshJwtToken(
            user.id,
        );
        response.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
        return response.send(user);
    }
}
