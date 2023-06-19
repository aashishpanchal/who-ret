import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { Injectable } from '@nestjs/common';
import { PaginationService } from './pagination.service';

@Injectable()
export class QueryService {
  private query: Record<string, any> = {};

  constructor(private readonly pagination: PaginationService) {}

  search(array: string[], q: string) {
    if (q) {
      const obj = array.reduce((p, c) => ({ ...p, [c]: `/${q}/i` }), {});
      this.query = { ...this.query, ...obj };
    }
    return this;
  }

  keyValue(key: string, value?: string) {
    if (value) this.query[key] = value;
    return this;
  }

  fields(value?: string) {
    if (value) this.query['fields'] = value;
    return this;
  }

  sort(value?: string) {
    if (value) this.query['sort'] = value;
    return this;
  }

  populate(value?: string) {
    if (value) this.query['populate'] = value;
    return this;
  }

  exc() {
    const { filter, projection, sort, population } = aqp(this.query);
    this.query = {};
    return { filter, projection, sort, population };
  }

  async excModelWithPaginate<T>(
    values: {
      count?: number;
      page?: number;
      size?: number;
    },
    model: Model<T>,
  ) {
    const { filter, population, projection, sort } = this.exc();

    const count = await model.countDocuments(filter);

    const queryModel = model
      .find(filter)
      .populate(population)
      .select(projection)
      .sort(sort as any);

    return this.pagination.paginate<T>(
      {
        ...values,
        count,
      },
      queryModel,
    );
  }
}
