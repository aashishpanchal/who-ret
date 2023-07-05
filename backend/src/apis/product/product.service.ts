import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MSG } from './constants';
import { MetaFiles } from './interfaces';
import { QueryService } from '@modules/query';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from './models';
import { CloudinaryService, CLOUDINARY_FOLDER } from '@modules/cloudinary';
import { UpdateProductDto, ProductQueryDto, CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly queryService: QueryService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Product.name) private productModel: ProductModel,
  ) {}

  async create(createProductDto: Partial<CreateProductDto>, userId: string) {
    return this.productModel.create({ ...createProductDto, user: userId });
  }

  async productImages(id: string, { images = [] }: MetaFiles) {
    // get product from db
    const product = await this.findById(id);
    // make folder of product
    if (images.length !== 0) {
      if (product.images.length !== 0) {
        const n = 5 - product.images.length; // how many space out of 5
        // after check images length according space
        if (images.length <= n) {
          const imageUrls = await Promise.all(
            images.map(async (file) => {
              return await this.cloudinaryService.upload(
                file,
                CLOUDINARY_FOLDER.PRODUCT,
              );
            }),
          );
          // push free space images
          imageUrls.forEach((item) => product.images.push(item));
        } else {
          throw new BadRequestException(`you have only ${n} image free space.`);
        }
      } else {
        const imageUrls = await Promise.all(
          images.map(async (file) => {
            return await this.cloudinaryService.upload(
              file,
              CLOUDINARY_FOLDER.PRODUCT,
            );
          }),
        );
        product.images = imageUrls;
      }
    }
    // save all changes
    return await product.save();
  }

  async deleteImage(id: string, imageId: string) {
    const product = await this.findById(id);

    if (product.images.length !== 0) {
      // Find the index of the image to delete
      const imageIndex = product.images.findIndex((image) => {
        return image._id.toString() === imageId;
      });
      // If the image is found, delete it from Cloudinary and remove it from the product's images array
      if (imageIndex !== -1) {
        await this.cloudinaryService.destroy(
          product.images[imageIndex].public_id,
        );

        product.images.splice(imageIndex, 1);

        return await product.save();
      } else {
        throw new NotFoundException(MSG.product_image_not_found);
      }
    }
    return product;
  }

  async findAll({
    page,
    search,
    size,
    category,
    user,
    subcategory,
    ...others
  }: Partial<ProductQueryDto>) {
    const s = search ? '/' + search + '/i' : undefined;

    return this.queryService
      .keyValue('keywords', s)
      .keyValue('public', others.public)
      .keyValue('category', category)
      .keyValue('subcategory', subcategory)
      .keyValue('user', user)
      .populate('category,subcategory')
      .sort(others.sort)
      .excModelWithPaginate({ page, size }, this.productModel);
  }

  async update(id: string, updateProductDto: Partial<UpdateProductDto>) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );

    if (!product) throw new NotFoundException(MSG.product_not_found);

    return product;
  }

  async findById(id: string, fields?: string) {
    const { projection } = this.queryService.fields(fields).exc();
    const product = await this.productModel.findById(id).select(projection);
    if (!product) throw new NotFoundException(MSG.product_not_found);
    return product;
  }

  async deleteOne(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) throw new NotFoundException(MSG.product_not_found);

    if (product?.images?.length !== 0) {
      await Promise.all(
        product.images.map(
          async (image) =>
            await this.cloudinaryService.destroy(image.public_id),
        ),
      );
    }

    return product;
  }
}
