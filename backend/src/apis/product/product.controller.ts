import {
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Controller,
  Query,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AtGuard } from '../auth';
import { MetaFiles } from './interfaces';
import { ProductService } from './product.service';
import { ParseObjectIdPipe } from '@core/global/pipes';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUser, ROLE, Roles, UserDocument } from '../user';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto';

@UseGuards(AtGuard)
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(ROLE.ADMIN, ROLE.WHOLESELLER)
  create(
    @CurrentUser() user: UserDocument,
    @Body() createProductDto: CreateProductDto,
  ) {
    const { user: userId, ...productDto } = createProductDto;
    if (user.role === ROLE.ADMIN) {
      return this.productService.create(
        productDto,
        userId ? userId : user._id.toString(),
      );
    }
    return this.productService.create(productDto, user._id.toString());
  }

  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN, ROLE.WHOLESELLER)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: UserDocument,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { user: userId, ...productDto } = updateProductDto;

    if (user.role === ROLE.ADMIN) {
      return this.productService.update(id, updateProductDto);
    }

    return this.productService.update(id, productDto);
  }

  @Get(':id')
  findById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('fields') fields?: string,
  ) {
    return this.productService.findById(id, fields);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN, ROLE.WHOLESELLER)
  deleteOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productService.deleteOne(id);
  }

  @Put(':id/images')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 6 }]))
  @Roles(ROLE.ADMIN, ROLE.WHOLESELLER)
  createImages(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFiles(ParseFilePipe) metaFiles: MetaFiles,
  ) {
    return this.productService.productImages(id, metaFiles);
  }

  @Delete(':id/image/:imageId')
  @Roles(ROLE.ADMIN, ROLE.WHOLESELLER)
  deleteImages(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('imageId', ParseObjectIdPipe) imageId: string,
  ) {
    return this.productService.deleteImage(id, imageId);
  }
}
