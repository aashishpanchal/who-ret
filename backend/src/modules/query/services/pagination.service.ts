import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaginationService {
  constructor(private readonly configService: ConfigService) {}

  // like 1.2 = 1 and 56.23 = 56
  private normalizedPage(page: number = 0) {
    return Math.max(0, parseInt(String(page)));
  }
  // same as above
  private normalizedSize(size: number = 10, max: number) {
    return Math.min(parseInt(String(size)), max);
  }

  // this function help to get totals pages
  private getTotals(count: number, size: number) {
    return Math.ceil(count / size);
  }

  // this method help to return data in formate forms.
  private async resFormat<T>(
    data: T,
    count: number,
    page: number,
    size: number,
  ) {
    // Calculate the total number of pages
    const totalPages = this.getTotals(count, size);
    // return formatted data
    return {
      count,
      totalPages,
      next: (page + 1) * size >= count ? undefined : page + 1,
      prev: page == 0 ? undefined : page - 1,
      results: data,
    };
  }

  // make method manage all required methods
  async paginate<T>(
    values: {
      count?: number;
      page?: number;
      size?: number;
    },
    queryModel: any,
  ) {
    let { page, size, count = 0 } = values;

    const max_page_size =
      this.configService.getOrThrow<number>('max_page_size');

    // first check page and size given or not
    if (page !== undefined || size !== undefined) {
      page = this.normalizedPage(page);
      size = this.normalizedSize(size, max_page_size);

      // Execute the query with skip and limit
      const results = await queryModel
        .skip(page * size)
        .limit(size)
        .exec();
      // send response with next and previous
      return await this.resFormat<T[]>(results, count, page, size);
    }

    return await queryModel;
  }
}
