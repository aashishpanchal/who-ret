import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from '@modules/otp';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '@apis/user/user.module';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  LocalStrategy,
} from './strategies';
import { AuthService } from './auth.service';

@Module({
  imports: [
    OtpModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      async useFactory(cfs: ConfigService) {
        return { secret: cfs.get('jwt.secret') };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
