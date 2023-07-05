import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AtGuard } from '@apis/auth';
import { ROLE, Roles } from '@apis/user';
import { FileType } from '@modules/cloudinary';
import { CategoryService } from '../category.service';
import { ParseObjectIdPipe } from '@core/global/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryQueryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Controller('api/categories')
@UseGuards(AtGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: FileType,
  ) {
    return this.categoryService.create(createCategoryDto, null, image);
  }

  @Get()
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: FileType,
  ) {
    return this.categoryService.update(id, updateCategoryDto, image);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
