import ms from 'ms';
import { hash, compare } from 'bcrypt';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  private generateOTP(size: number) {
    if (size <= 0) throw new Error('otp size never be 0 or negative.');
    let otp = '';

    const digits = '0123456789';

    for (let i = 0; i < size; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    if (!this.configService.get('isDev')) return otp;
    return '123456';
  }

  async otpSendBySMS(phone: string) {
    const exp = this.configService.get('otp.exp');
    const size = this.configService.get('otp.size');
    // generate random otp
    const otp = this.generateOTP(size);
    // string time formate to convert in ms
    const ttl = ms(exp);
    const expires = Date.now() + ttl;
    // make hash
    const data = `${phone}.${otp}.${expires}`;
    const otpHash = Buffer.from(await hash(data, 5)).toString('base64');

    const body = `${otp} is your ${this.configService.get(
      'companyName',
    )} OTP. please do not share it with anyone and otp validate ${exp}.`;

    if (!this.configService.get('isDev'))
      this.twilioService.client.messages.create({
        body,
        from: this.configService.get('twilio.phone_number'),
        to: phone,
      });

    return { hash: `${otpHash}.${expires}`, phone };
  }

  async verifyPhoneOtp(
    phone: string,
    options: {
      otp: string;
      hash: string;
    },
  ) {
    const { hash, otp } = options;
    const [otpHash, expires] = hash.split('.');

    if (Date.now() > +expires) throw new BadRequestException('Invalid OTP');

    const data = `${phone}.${otp}.${expires}`;

    return await compare(data, Buffer.from(otpHash, 'base64').toString());
  }
}
