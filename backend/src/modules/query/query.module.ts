import { Global, Module } from '@nestjs/common';
import { PaginationService, QueryService } from './services';

@Global()
@Module({
  providers: [PaginationService, QueryService],
  exports: [PaginationService, QueryService],
})
export class QueryModule {}
