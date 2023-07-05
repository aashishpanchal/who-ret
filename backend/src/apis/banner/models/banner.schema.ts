import { HydratedDocument, Model } from 'mongoose';
import { FileInfo, FileProp } from '@modules/cloudinary';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Banner {
  @FileProp()
  image: FileInfo;

  @Prop({ default: false })
  public: boolean;

  @Prop()
  description: string;
}

export type BannerDocument = HydratedDocument<Banner>;

export type BannerModel = Model<Banner>;

export const BannerSchema = SchemaFactory.createForClass(Banner);

export const BANNER_MODEL = Banner.name;
