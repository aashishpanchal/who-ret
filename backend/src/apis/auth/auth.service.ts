import ms from 'ms';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { TOKEN } from './enums';
import { RegisterDto } from './dto';
import { AuthMsgs } from './constants';
import { JwtService } from '@nestjs/jwt';
import { uuid4 } from '@core/utils/uuid';
import { JwtPayload } from './interfaces';
import { OtpService } from '@modules/otp';
import { RedisCache } from '@core/interfaces';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@apis/user/user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
  ) {}

  async validateUser(phone: string, password: string) {
    const user = await this.userService.findByPhone(phone);

    if (!user) throw new NotFoundException(AuthMsgs.enter_valid_credentials);

    if (!(await user.isValidPassword(password)))
      throw new UnauthorizedException(AuthMsgs.enter_valid_credentials);

    return user;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create({
      ...registerDto,
      isPhoneVerify: false,
    });
    return this.otpService.otpSendBySMS(user.phone);
  }

  async verifyPhoneOtp(phone: string, options: { otp: string; hash: string }) {
    if (!(await this.otpService.verifyPhoneOtp(phone, options)))
      throw new BadRequestException(AuthMsgs.invalid_otp);

    let user = await this.userService.findByPhone(phone);

    if (!user) throw new BadRequestException(AuthMsgs.invalid_phone_number);

    user.isPhoneVerify = true;

    user = await user.save();

    const tokens = await this.getTokens(user._id.toString());

    return { ...user.toJSON(), tokens };
  }

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
        this.configService.get('jwt.accessExp'),
      ),
      await this.getToken(
        userId,
        TOKEN.REFRESH,
        this.configService.get('jwt.refreshExp'),
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
