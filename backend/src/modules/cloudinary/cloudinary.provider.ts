import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get('cloud.name'),
      api_key: configService.get('cloud.api_key'),
      api_secret: configService.get('cloud.api_secret'),
    });
  },
  inject: [ConfigService],
};
