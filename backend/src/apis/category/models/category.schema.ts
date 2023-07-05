import { FileInfo, FileProp } from '@modules/cloudinary';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: true, required: true, trim: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, default: null })
  parent: Types.ObjectId | CategoryDocument;

  @FileProp()
  thumbnail: FileInfo;

  @Prop({ default: false })
  public: boolean;

  @Prop()
  description: string;
}

export type CategoryDocument = HydratedDocument<Category>;
export type CategoryModel = Model<Category>;

export const CategorySchema = SchemaFactory.createForClass(Category);

export const CATEGORY_MODEL = Category.name;
