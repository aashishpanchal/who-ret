import { UserMsgs } from '../constants';
import { InjectModel } from '@nestjs/mongoose';
import { UserKyc, UserKycModel } from '../models';
import { CreateUserKycDto, UpdateUserKycDto } from '../dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserKycService {
  constructor(
    @InjectModel(UserKyc.name) private readonly kycModel: UserKycModel,
  ) {}

  async createByUserId(createKycDto: Partial<CreateUserKycDto>) {
    const { user } = createKycDto;
    if (await this.kycModel.findOne({ user }))
      throw new BadRequestException(UserMsgs.user_kyc_already_exit);
    return this.kycModel.create(createKycDto);
  }

  async updateById(id: string, updateKycUserDto: UpdateUserKycDto) {
    const kyc = await this.findById(id);
    return kyc.$set(updateKycUserDto).save();
  }

  async findById(id: string) {
    const kyc = await this.kycModel.findById(id);
    if (!kyc) throw new BadRequestException(UserMsgs.kyc_not_found);
    return kyc;
  }

  async removeById(id: string) {
    const kyc = await this.kycModel.findByIdAndRemove(id);
    if (!kyc) throw new BadRequestException(UserMsgs.kyc_not_found);
    return kyc;
  }
}
