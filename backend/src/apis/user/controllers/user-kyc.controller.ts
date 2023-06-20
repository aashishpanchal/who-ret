import {
  Controller,
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ROLE } from '../enums';
import { Roles } from '../decorators';
import { UserKycService } from '../services';
import { AtGuard, RoleGuard } from '@apis/auth/guards';
import { ParseObjectIdPipe } from '@core/global/pipes';
import { CreateUserKycDto, UpdateUserKycDto } from '../dto';

@Controller('api/user-kyc')
@UseGuards(AtGuard, RoleGuard)
export class KycController {
  constructor(private readonly UserKycService: UserKycService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  createByUserId(@Body() createUserKycDto: CreateUserKycDto) {
    return this.UserKycService.createByUserId(createUserKycDto);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findById(@Param('id', ParseObjectIdPipe) kycId: string) {
    return this.UserKycService.findById(kycId);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  updateById(
    @Param('id', ParseObjectIdPipe) kycId: string,
    @Body() updateKycDto: UpdateUserKycDto,
  ) {
    return this.UserKycService.updateById(kycId, updateKycDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  removeById(@Param('id', ParseObjectIdPipe) kycId: string) {
    return this.UserKycService.removeById(kycId);
  }
}
