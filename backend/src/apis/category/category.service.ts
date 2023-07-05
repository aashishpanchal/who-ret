import { MSG } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService } from '@/modules/query';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from './dto';
import {
  CLOUDINARY_FOLDER,
  CloudinaryService,
  FileType,
} from '@modules/cloudinary';
import { Category, CategoryModel } from './models';

@Injectable()
export class CategoryService {
  constructor(
    private readonly queryService: QueryService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Category.name) private readonly categoryModel: CategoryModel,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    parent: string = null,
    image?: FileType,
  ) {
    const { name } = createCategoryDto;

    if (await this.categoryModel.findOne({ name }))
      throw new BadRequestException(MSG.category_name_already_exit);

    if (image) {
      const thumbnail = await this.cloudinaryService.upload(
        image,
        CLOUDINARY_FOLDER.CATEGORY,
      );
      return this.categoryModel.create({
        ...createCategoryDto,
        parent,
        thumbnail,
      });
    }

    return await this.categoryModel.create({ ...createCategoryDto, parent });
  }

  async findAll(
    { page, search, size, ...others }: CategoryQueryDto,
    parent: string = 'null',
  ) {
    return this.queryService
      .search(['name'], search)
      .keyValue('public', others.public)
      .keyValue('parent', parent)
      .sort(others.sort)
      .fields('name,public,description,createdAt,thumbnail.url')
      .excModelWithPaginate({ page, size }, this.categoryModel);
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new BadRequestException(MSG.category_not_found);
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    image?: FileType,
  ) {
    const updateCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!updateCategory) throw new BadRequestException(MSG.category_not_found);

    if (image) {
      if (updateCategory?.thumbnail?.public_id)
        updateCategory.thumbnail = await this.cloudinaryService.updateById(
          updateCategory.thumbnail.public_id,
          image,
        );
      updateCategory.thumbnail = await this.cloudinaryService.upload(
        image,
        CLOUDINARY_FOLDER.CATEGORY,
      );
      return updateCategory.save();
    }
    return updateCategory;
  }

  async remove(id: string) {
    const removeCategory = await this.categoryModel.findByIdAndRemove(id);
    if (!removeCategory) throw new BadRequestException(MSG.category_not_found);

    if (removeCategory?.thumbnail?.public_id)
      await this.cloudinaryService.destroy(removeCategory.thumbnail.public_id);

    return removeCategory;
  }
}
