import { Expose, Transform } from 'class-transformer';

export class FileInfoDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string;

  @Expose()
  url: string;
}
