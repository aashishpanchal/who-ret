import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './user/guards';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BannerModule,
    CategoryModule,
    ProductModule,
  ],
  providers: [{ provide: APP_GUARD, useValue: RoleGuard }],
})
export class ApisModule {}
