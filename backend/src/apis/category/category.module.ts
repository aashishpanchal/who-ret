import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './models';
import { CategoryService } from './category.service';
import { CloudinaryModule } from '@modules/cloudinary';
import { CategoryController, SubCategoryController } from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [CategoryController, SubCategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
