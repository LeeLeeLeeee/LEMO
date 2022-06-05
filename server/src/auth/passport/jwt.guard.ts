/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    ExecutionContext,
    UnauthorizedException,
    Injectable,
    Inject,
    InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class JWTAuthenticationGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        @Inject(AuthService) private readonly authService: AuthService,
    ) {
        super();
    }
    // @ts-ignore: Unreachable code error
    async handleRequest(err, user, info, context, status) {
        try {
            if (user) return { ...user };

            const { refresh_token } = context.getRequest().cookies;
            const response = context.getResponse();
            if (refresh_token === undefined) {
                throw new UnauthorizedException();
            } else {
                const userID = await this.authService.checkRefreshToken(
                    refresh_token,
                );

                if (userID === null) throw new UnauthorizedException();

                const accessCookie =
                    this.authService.getCookieWithJwtToken(userID);
                const refreshCookie =
                    this.authService.getCookieWithRefreshJwtToken(userID);
                response.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
                return { userID };
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );
        if (isPublic) return true;
        return super.canActivate(context);
    }
}
