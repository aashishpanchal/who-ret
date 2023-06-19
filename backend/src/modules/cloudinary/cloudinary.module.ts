import { Module } from '@nestjs/common';
import { memoryStorage } from 'multer';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

const multerConfig = {
  storage: memoryStorage(),
};

@Module({
  imports: [MulterModule.register(multerConfig)],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [MulterModule.register(multerConfig), CloudinaryService],
})
export class CloudinaryModule {}
