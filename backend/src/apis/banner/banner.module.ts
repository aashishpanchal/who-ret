import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { CloudinaryModule } from '@modules/cloudinary';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    CloudinaryModule,
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
