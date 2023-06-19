import { Module } from '@nestjs/common';
import { userControllers } from './controllers';
import { ModelModule } from './models/model.module';
import { UserAddressService, UserService } from './services';

@Module({
  imports: [ModelModule],
  controllers: [...userControllers],
  providers: [UserService, UserAddressService],
  exports: [UserService],
})
export class UserModule {}
