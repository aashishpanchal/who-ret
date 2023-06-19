import { UserService } from '@/apis/user/services';
import { isEmail, isMobilePhone } from 'class-validator';
import { Question, QuestionSet, ValidateFor } from 'nest-commander';

@QuestionSet({ name: 'register' })
export class RegisterQuestion {
  constructor(private readonly userService: UserService) {}

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
      const user = await this.userService.findOne(value);
      if (user) return 'This phone use by another user.';
      return true;
    }
    return 'Please enter a valid phone number';
  }

  @ValidateFor({ name: 'email' })
  validateEmail(value: string) {
    if (isEmail(value)) return true;
    return 'please enter valid email';
  }
}
