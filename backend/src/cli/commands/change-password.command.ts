import { isMobilePhone } from 'class-validator';
import { PasswordCommandOptions } from '../interfaces';
import {
  Option,
  Command,
  CommandRunner,
  InquirerService,
} from 'nest-commander';
import { UserCommandService } from '@cli/services';

type CommandOptions = { phone: string };

@Command({
  name: 'user:change-password',
  description: "Change a user's password for auth user",
})
export class ChangePasswordCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly userCommandService: UserCommandService,
  ) {
    super();
  }

  async run(inputs: string[], options?: CommandOptions) {
    const phone = await this.phoneValidate(options.phone);
    const { password } = await this.inquirerService.ask(
      'password',
      {} as PasswordCommandOptions,
    );

    try {
      await this.userCommandService.changePassword(phone, password);
      console.log(`Password changed successfully for user '${phone}'`);
    } catch (error) {
      console.error(error.message);
    }
  }

  @Option({
    flags: '-p --phone [string]',
    description: 'phone to change password for user.',
    required: true,
  })
  parsePhone(val: string) {
    if (isMobilePhone(val, 'en-AU', { strictMode: true })) return val;
    console.error('Invalid phone number, please enter valid phone number.');
    process.exit(1);
  }

  async phoneValidate(phone: string) {
    if (!(await this.userCommandService.checkPhone(phone))) {
      return phone;
    }
    console.error(`user ${phone} does not exit.`);
    process.exit(1);
  }
}
