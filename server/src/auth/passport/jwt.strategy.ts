import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies.Authentication;
                },
            ]),
            ignoreExpiration: true,
            secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
        });
    }
    async validate(payload: any) {
        return { userID: payload.userID };
    }
}
