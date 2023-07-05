import { AuthMsgs } from '../constants';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(phone: string, password: string) {
    const user = await this.authService.validateUser(phone, password);
    if (!user.isActive)
      throw new ForbiddenException(AuthMsgs.no_active_account);
    return user;
  }
}
