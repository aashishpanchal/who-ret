import { ROLE } from '@apis/user/enums';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from '@apis/user/models';

@Injectable()
export class UserCommandService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async checkPhone(phone: string) {
    const user = await this.userModel.findOne({ phone });
    if (user) return false;
    return true;
  }

  async createSuperuser(phone: string, email: string, password: string) {
    if (await this.userModel.findOne({ phone })) {
      console.log('Phone number already use by another user.');
      process.exit(1);
    }

    return await this.userModel.create({
      phone,
      email,
      password,
      isActive: true,
      isPhoneVerify: true,
      isEmailVerify: true,
      role: ROLE.ADMIN,
    });
  }

  async changePassword(phone: string, password) {
    const user = await this.userModel.findOne({ phone });
    if (!user) {
      console.error('The phone number entered is not valid.');
      process.exit(1);
    }
    user.password = password;
    return await user.save();
  }
}
