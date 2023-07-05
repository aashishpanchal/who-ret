import { ObjectId } from 'mongoose';
import { ValidateNested } from 'class-validator';
import { FileInfoDto } from '@modules/cloudinary';
import { Expose, Transform, Type } from 'class-transformer';

export class CategoryDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  @Type(() => CategoryDto)
  @ValidateNested()
  parent: CategoryDto | null;

  @Expose()
  public: boolean;

  @Expose()
  @Type(() => FileInfoDto)
  @ValidateNested()
  thumbnail: FileInfoDto | null;

  @Expose()
  description: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdAt: string;
}
