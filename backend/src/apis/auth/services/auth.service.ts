import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterDto } from '../dto';
import { AuthMsgs } from '../constants';
import { OtpService } from '@modules/otp';
import { TokenService } from './token.service';
import { UserService } from '@apis/user/services';
import { UserMsgs } from '@apis/user/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(phone: string, password: string) {
    const user = await this.userService.findOne(phone);

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

    let user = await this.userService.findOne(phone);

    if (!user) throw new BadRequestException(AuthMsgs.invalid_phone_number);

    user.isPhoneVerify = true;

    user = await user.save();

    const tokens = await this.tokenService.getTokens(user._id.toString());

    return { ...user.toJSON(), tokens };
  }
}
