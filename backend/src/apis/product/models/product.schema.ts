import { GST } from '../enums';
import { User, UserDocument } from '@apis/user/models';
import { Types, HydratedDocument, Model } from 'mongoose';
import { FileInfo, FilePropArray } from '@modules/cloudinary';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '@apis/category/models';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId | UserDocument;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: Types.ObjectId | CategoryDocument;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  subcategory: Types.ObjectId | CategoryDocument;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  mrp: number;

  @Prop({ type: String, enum: Object.values(GST), default: GST.PRODUCT_GST })
  gst: GST;

  @Prop({ default: 0 })
  discount: number;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: false })
  public: boolean;

  @Prop()
  keywords: string[];

  @FilePropArray()
  images: Array<FileInfo & { _id?: string }>;
}

export type ProductDocument = HydratedDocument<Product>;

export type ProductModel = Model<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
