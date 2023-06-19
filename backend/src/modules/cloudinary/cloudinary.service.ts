import { v2 } from 'cloudinary';
import DatauriParser from 'datauri/parser';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  private parser: DatauriParser;

  constructor(private readonly configService: ConfigService) {
    this.parser = new DatauriParser();
  }

  private getFolder(value: string) {
    const baseFolder = this.configService.get('cloud.project');
    return `${baseFolder}/${value}`;
  }

  private fileFormat(file: Express.Multer.File) {
    return this.parser.format('png', file.buffer);
  }

  async upload(file: Express.Multer.File, folder: string) {
    const fileFormat = this.fileFormat(file);

    const { public_id, url } = await v2.uploader.upload(fileFormat.content, {
      folder: this.getFolder(folder),
      width: 600,
      crop: 'fit',
      format: 'png',
    });

    return { public_id, url };
  }

  async updateById(publicId: string, file: Express.Multer.File) {
    const fileFormat = this.fileFormat(file);

    const { public_id, url } = await v2.uploader.upload(fileFormat.content, {
      public_id: publicId,
    });

    return { public_id, url };
  }

  async destroy(public_id: string) {
    return v2.uploader.destroy(public_id, (err, des) => des);
  }
}
