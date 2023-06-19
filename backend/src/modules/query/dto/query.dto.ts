import { Expose, Type } from 'class-transformer';

export function queryTransForm(classRef: any) {
  class QueryDto extends classRef {
    @Expose()
    count: number;

    @Expose()
    totalPages: number;

    @Expose()
    next: boolean;

    @Expose()
    prev: false;

    @Expose()
    @Type(() => classRef)
    results: (typeof classRef)[];
  }

  return QueryDto;
}
