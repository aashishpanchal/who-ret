import { Env } from '@core/utils/env';
import { IConfig } from './interfaces';

export default (): IConfig => {
  const env = Env.get<string>('NODE_ENV');
  const isDev = env === 'development';
  return {
    env,
    isDev,
    host: Env.get<string>('HOST', '0.0.0.0'),
    port: Env.get_cb('PORT', (value = '3000') => parseInt(value, 10)),
    db: {
      uri: Env.getOrThrow<string>('DB_URI'),
      dbName: Env.getOrThrow<string>('DB_NAME'),
    },
    redis: {
      url: Env.get<string>('REDIS_URL'),
    },
    jwt: {
      auth_header_type: ['bearer', 'token'],
      secret: Env.get<string>('JWT_SECRET'),
      auth_header_name: 'authorization',
      accessExp: Env.get<string>('JWT_ACCESS_EXPIRATION_MINUTES'),
      refreshExp: Env.get<string>('JWT_REFRESH_EXPIRATION_DAYS'),
      issuer: 'whoret.com',
    },
    cloud: {
      name: Env.getOrThrow<string>('CLOUD_NAME'),
      api_key: Env.getOrThrow<string>('CLOUD_API_KEY'),
      api_secret: Env.getOrThrow<string>('CLOUD_API_SECRET'),
      project: Env.getOrThrow<string>('CLOUD_PROJECT'),
    },
    twilio: {
      sid: Env.getOrThrow<string>('TWILIO_SID'),
      token: Env.getOrThrow<string>('TWILIO_AUTH_TOKEN'),
      phone_number: Env.getOrThrow<string>('TWILIO_PHONE_NUMBER'),
    },
    otp: {
      exp: '2m',
      size: 6,
    },
    companyName: 'whoret.com',
    max_page_size: 50,
  };
};
