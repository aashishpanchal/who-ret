import { isMongoId } from 'class-validator';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`"${value}" not a valid Object Id.`);
    }
    return value;
  }
}
