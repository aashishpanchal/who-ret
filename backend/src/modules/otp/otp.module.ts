import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          accountSid: configService.getOrThrow('twilio.sid'),
          authToken: configService.getOrThrow('twilio.token'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
