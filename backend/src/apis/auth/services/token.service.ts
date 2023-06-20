import ms from 'ms';
import { TOKEN } from '../enums';
import { uuid4 } from '@core/utils/uuid';
import { JwtService } from '@nestjs/jwt';
import { AuthMsgs } from '../constants';
import { JwtPayload } from '../interfaces';
import { RedisCache } from '@core/interfaces';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@apis/user/services';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
  ) {}

  async getToken(sub: string, type: TOKEN, exp: string) {
    const payload = { jti: uuid4(), sub, type };

    const token = await this.jwtService.signAsync(payload, { expiresIn: exp });

    if (type === TOKEN.REFRESH)
      await this.cacheManager.set(payload['jti'], token, {
        ttl: ms(exp) / 1000,
      });

    return token;
  }

  async getTokens(userId: string) {
    const [at, rt] = await Promise.all([
      await this.getToken(
        userId,
        TOKEN.ACCESS,
        this.config.get('jwt.accessExp'),
      ),
      await this.getToken(
        userId,
        TOKEN.REFRESH,
        this.config.get('jwt.refreshExp'),
      ),
    ]);
    return {
      [TOKEN.ACCESS]: at,
      [TOKEN.REFRESH]: rt,
    };
  }

  async refreshTokens(userId: string, payload: JwtPayload) {
    const user = await this.userService.findById(userId);

    if (!user) throw new ForbiddenException(AuthMsgs.access_denied);

    // delete token in redis database
    await this.cacheManager.del(payload['jti']);

    const tokens = await this.getTokens(user.id);

    return { tokens, user };
  }
}
