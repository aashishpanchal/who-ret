import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN } from '../enums';
import { JwtPayload } from '../interfaces';
import { UserService } from '@apis/user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('jwt.secret'),
    });
  }
  async validate(payload: JwtPayload) {
    if (payload.type !== TOKEN.ACCESS) throw new ForbiddenException();

    const user = await this.userService.findById(payload.sub);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
