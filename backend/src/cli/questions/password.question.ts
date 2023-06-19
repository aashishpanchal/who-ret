import { isNotEmpty } from 'class-validator';
import { Question, QuestionSet, ValidateFor } from 'nest-commander';

@QuestionSet({ name: 'password' })
export class PasswordQuestion {
  @Question({
    type: 'password',
    name: 'password',
    message: 'password:',
  })
  password(val: string) {
    return val;
  }
  @Question({
    type: 'password',
    name: 'confirmPassword',
    message: 'confirm-password:',
  })
  confirmPassword(val: string) {
    return val;
  }

  @ValidateFor({ name: 'password' })
  validatePassword(value: string) {
    if (isNotEmpty(value)) return true;
    return 'please enter valid password';
  }

  @ValidateFor({ name: 'confirmPassword' })
  validateConfirmPassword(value: string, answer: any) {
    if (isNotEmpty(value)) {
      if (value === answer.password) {
        return true;
      }
      return 'confirm password not match.';
    }
    return 'please enter valid password';
  }
}
