import {
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { LoginDto } from '../dto';
import { validate } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const condition = plainToInstance(LoginDto, request.body);

    const validationErrors = await validate(condition);

    if (validationErrors.length > 0) {
      throw new BadRequestException(
        validationErrors
          .filter((item) => !!item.constraints)
          .map((item) => Object.values(item.constraints))
          .flat(),
      );
    }

    const parentCanActivate = (await super.canActivate(context)) as boolean;

    return parentCanActivate;
  }
}
