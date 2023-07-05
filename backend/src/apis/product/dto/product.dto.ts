import { ObjectId } from 'mongoose';
import { CategoryDto } from '@apis/category/dto';
import { FileInfoDto } from '@modules/cloudinary';
import { Expose, Transform, Type } from 'class-transformer';

export class PackDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  numOfProduct: number;

  @Expose()
  deductionPrice: number;

  @Expose()
  public: boolean;
}

export class ProductDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  user: string;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  @Type(() => CategoryDto)
  subcategory: CategoryDto;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  expire: string;

  @Expose()
  stock: number;

  @Expose()
  keywords: string[];

  @Expose()
  discount: number;

  @Expose()
  discountPrice: number;

  @Expose()
  public: boolean;

  @Expose()
  description: string;

  @Expose()
  @Type(() => FileInfoDto)
  thumbnail: FileInfoDto;

  @Expose()
  @Type(() => FileInfoDto)
  images: FileInfoDto[];

  @Expose()
  @Type(() => PackDto)
  pack: PackDto[];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
