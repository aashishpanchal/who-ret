import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models';
import { ProductService } from './product.service';
import { CloudinaryModule } from '@modules/cloudinary';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
