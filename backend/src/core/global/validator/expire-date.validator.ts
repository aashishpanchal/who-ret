import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'expireDate', async: false })
export class ExpireDateValidator implements ValidatorConstraintInterface {
  validate(expireDate: string) {
    const currentDate = new Date();
    const enteredDate = new Date(expireDate);

    // Check if the entered date is valid
    if (isNaN(enteredDate.getTime())) {
      return false;
    }

    // Check if the entered date is in the future
    if (enteredDate.getTime() < currentDate.getTime()) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Expire date must be a valid date in the future';
  }
}
