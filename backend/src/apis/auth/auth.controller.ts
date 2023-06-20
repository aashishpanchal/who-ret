import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { OtpDto } from '@modules/otp';
import { JwtPayload } from './interfaces';
import { UserDocument } from '../user/models';
import { AuthUserDto, RegisterDto } from './dto';
import { GetUserId, GetUser } from './decorators';
import { Serialize } from '@core/global/interceptors';
import { AuthService, TokenService } from './services';
import { AtGuard, LocalAuthGuard, RtGuard } from './guards';

@Serialize(AuthUserDto)
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@GetUser() user: UserDocument) {
    const tokens = await this.tokenService.getTokens(user._id.toString());
    return { ...user.toJSON(), tokens };
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('register/verify')
  verifyPhoneOtp(@Body() { phone, hash, otp }: OtpDto) {
    return this.authService.verifyPhoneOtp(phone, { hash, otp });
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  async refresh(@GetUserId() userId: string, @GetUser() payload: JwtPayload) {
    const { tokens, user } = await this.tokenService.refreshTokens(
      userId,
      payload,
    );
    return { ...user.toJSON(), tokens };
  }

  @Delete('logout')
  @UseGuards(AtGuard, RtGuard)
  logout() {
    return { auth: false, user: null };
  }
}
