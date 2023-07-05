import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AtGuard } from '../auth';
import { ROLE, Roles } from '../user';
import { FileType } from '@modules/cloudinary';
import { BannerService } from './banner.service';
import { ParseObjectIdPipe } from '@core/global/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBannerDto, UpdateBannerDto, BannerQueryDto } from './dto';

@Controller('api/banners')
@UseGuards(AtGuard)
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile() image: FileType,
  ) {
    return this.bannerService.create(createBannerDto, image);
  }

  @Get()
  findAll(@Query() query: BannerQueryDto) {
    return this.bannerService.findAll(query);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bannerService.findById(id);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFile() image: FileType,
  ) {
    return this.bannerService.update(id, updateBannerDto, image);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bannerService.remove(id);
  }
}
