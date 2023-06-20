import { ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '@apis/user/dto';
import { TOKEN } from '../enums';

export class TokensDto {
  @Expose()
  [TOKEN.ACCESS]: string;

  @Expose()
  [TOKEN.REFRESH]: string;
}

export class AuthUserDto extends UserDto {
  @Expose()
  @Type(() => TokensDto)
  @ValidateNested()
  tokens: TokensDto;

  @Expose()
  auth: false;

  @Expose()
  user: null;

  @Expose()
  hash: string;
}
