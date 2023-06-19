import { ObjectId } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Exclude()
  password: string;

  @Expose()
  isActive: boolean;

  @Expose()
  isSuperUser: boolean;

  @Expose()
  loginAt: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
