import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public } from 'decorator';
import { Response } from 'express';
import { CreateUserDto, DeleteUserDto, SignInUserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './passport/local.guard';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() userData: CreateUserDto, @Res() response: Response) {
        const user = await this.authService.register({ ...userData });
        const accessCookie = this.authService.getCookieWithJwtToken(user.id);
        const refreshCookie = this.authService.getCookieWithRefreshJwtToken(
            user.id,
        );
        response.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
        response.send(user);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthenticationGuard)
    @ApiBody({ description: '유저 로그인', type: [SignInUserDto] })
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
        response.send(user);
    }

    @Post('signOut')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() request: { user: any } & Request,
        @Res() response: Response,
    ) {
        const {
            user: { userID },
        } = request;
        const cookies = await this.authService.clearJwtTokenCookie(userID);
        response.setHeader('Set-Cookie', cookies);
        response.send('ok');
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    async delete(
        @Req() request: { user: any } & Request,
        @Res() response: Response,
        @Body() body: DeleteUserDto,
    ) {
        const {
            user: { userID },
        } = request;
        await this.authService.deleteUser(userID, body.password);
        const cookies = await this.authService.clearJwtTokenCookie(userID);
        response.setHeader('Set-Cookie', cookies);
        response.send('ok');
    }
}
