import { UserCommandService } from '../services';
import { isEmail, isMobilePhone } from 'class-validator';
import { Question, QuestionSet, ValidateFor } from 'nest-commander';

@QuestionSet({ name: 'register' })
export class RegisterQuestion {
  constructor(private readonly userCommandService: UserCommandService) {}

  @Question({
    type: 'input',
    name: 'phone',
    message: 'phone:',
  })
  phone(val: string) {
    return val;
  }

  @Question({
    type: 'input',
    name: 'email',
    message: 'email:',
  })
  email(val: string) {
    return val;
  }

  @ValidateFor({ name: 'phone' })
  async validatePhone(value: string) {
    if (isMobilePhone(value, 'en-AU', { strictMode: true })) {
      if (await this.userCommandService.checkPhone(value)) return true;
      return 'That phone is already taken.';
    }
    return 'The phone number entered is not valid.';
  }

  @ValidateFor({ name: 'email' })
  validateEmail(value: string) {
    if (isEmail(value)) return true;
    return 'please enter valid email';
  }
}
