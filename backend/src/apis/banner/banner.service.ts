import { MSG } from './constants';
import { QueryService } from '@modules/query';
import { InjectModel } from '@nestjs/mongoose';
import { Banner, BannerModel } from './models';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBannerDto, UpdateBannerDto, BannerQueryDto } from './dto';
import {
  CLOUDINARY_FOLDER,
  CloudinaryService,
  FileType,
} from '@modules/cloudinary';

@Injectable()
export class BannerService {
  constructor(
    private readonly queryService: QueryService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Banner.name) private readonly bannerModel: BannerModel,
  ) {}

  async create(createBannerDto: CreateBannerDto, bannerImg?: FileType) {
    const image = await this.cloudinaryService.upload(
      bannerImg,
      CLOUDINARY_FOLDER.BANNER,
    );
    return this.bannerModel.create(Object.assign(createBannerDto, { image }));
  }

  async findAll({ page, search, size, ...others }: BannerQueryDto) {
    return this.queryService
      .search(['description'], search)
      .keyValue('public', others.public)
      .sort(others.sort)
      .fields('name,public,createdAt,description,image.url')
      .excModelWithPaginate({ page, size }, this.bannerModel);
  }

  async findById(id: string) {
    const banner = await this.bannerModel.findById(id);
    if (!banner) throw new BadRequestException(MSG.banner_not_found);
    return banner;
  }

  async update(
    id: string,
    updateBannerDto: UpdateBannerDto,
    bannerImg?: FileType,
  ) {
    const updateBanner = await this.bannerModel.findByIdAndUpdate(
      id,
      updateBannerDto,
      {
        new: true,
      },
    );
    if (!updateBanner) throw new BadRequestException(MSG.banner_not_found);

    if (bannerImg) {
      if (updateBanner.image.public_id)
        updateBanner.image = await this.cloudinaryService.updateById(
          updateBanner.image.public_id,
          bannerImg,
        );
      updateBanner.image = await this.cloudinaryService.upload(
        bannerImg,
        CLOUDINARY_FOLDER.BANNER,
      );
      return updateBanner.save();
    }

    return updateBanner;
  }

  async remove(id: string) {
    const removeBanner = await this.bannerModel.findByIdAndRemove(id);

    if (!removeBanner) throw new BadRequestException(MSG.banner_not_found);

    if (removeBanner?.image?.public_id)
      await this.cloudinaryService.destroy(removeBanner.image.public_id);

    return removeBanner;
  }
}
