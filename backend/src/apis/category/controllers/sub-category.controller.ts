import {
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AtGuard } from '@apis/auth';
import { ROLE, Roles } from '@apis/user';
import { FileType } from '@modules/cloudinary';
import { BaseQueryDto } from '@core/global/dto';
import { CategoryService } from '../category.service';
import { ParseObjectIdPipe } from '@core/global/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@UseGuards(AtGuard)
@Controller('api/categories/:parentId/subcategories')
export class SubCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Param('parentId', ParseObjectIdPipe) parentId: string,
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: FileType,
  ) {
    console.log(parentId);
    return this.categoryService.create(createCategoryDto, parentId, image);
  }

  @Get()
  findAll(@Query() query: BaseQueryDto, @Param('parentId') parentId: string) {
    return this.categoryService.findAll(query, parentId);
  }

  @Get(':subId')
  @Roles(ROLE.ADMIN)
  findById(@Param('subId', ParseObjectIdPipe) subId: string) {
    return this.categoryService.findById(subId);
  }

  @Put(':subId')
  @Roles(ROLE.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('subId', ParseObjectIdPipe) subId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: FileType,
  ) {
    return this.categoryService.update(subId, updateCategoryDto, image);
  }

  @Delete(':subId')
  @Roles(ROLE.ADMIN)
  remove(@Param('subId', ParseObjectIdPipe) subId: string) {
    return this.categoryService.remove(subId);
  }
}
