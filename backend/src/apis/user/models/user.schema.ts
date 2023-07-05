import { ROLE } from '../enums';
import { CREDIT } from '../constants';
import { compare, hash } from 'bcrypt';
import { HydratedDocument, Model } from 'mongoose';
import { FileProp, FileType } from '@modules/cloudinary';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.RETAILER,
  })
  role: ROLE;

  @FileProp()
  avatar?: FileType;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: CREDIT })
  credit: number;

  @Prop({ default: 0 })
  subCredit: number;

  @Prop()
  abnNumber: string;

  @Prop({ default: false })
  isAbnVerify: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isPhoneVerify: boolean;

  @Prop({ default: false })
  isEmailVerify: boolean;

  isValidPassword: (password: string) => Promise<boolean>;
}

export type UserDocument = HydratedDocument<User>;

export type UserModel = Model<User>;

export const UserSchema = SchemaFactory.createForClass(User);

// middlewares
UserSchema.pre('save', async function (next: Function) {
  if (this.password) {
    if (!this?.isModified('password')) return next();
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

UserSchema.method('isValidPassword', async function (password: string) {
  if (this.password) return await compare(password, this.password);
  return false;
});
