import { ObjectId } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: string;

  @Exclude()
  password: string;

  @Expose()
  abnNumber: string;

  @Expose()
  isAbnVerify: boolean;

  @Expose()
  isActive: boolean;

  @Expose()
  isPhoneVerify: boolean;

  @Expose()
  isEmailVerify: boolean;

  @Expose()
  loginAt: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
