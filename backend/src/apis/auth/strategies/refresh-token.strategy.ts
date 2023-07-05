import { TOKEN } from '../enums';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField('token'),
      ]),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt.secret'),
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req?.body['token'];

    if (payload.type !== TOKEN.REFRESH) throw new ForbiddenException();

    return {
      ...payload,
      refreshToken,
    };
  }
}
