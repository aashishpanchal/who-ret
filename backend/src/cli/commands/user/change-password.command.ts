import { isMobilePhone } from 'class-validator';
import { PasswordCommandOptions } from '../../interfaces';
import {
  Option,
  Command,
  CommandRunner,
  InquirerService,
} from 'nest-commander';

@Command({
  name: 'user:change-password',
  description: "Change a user's password for auth user",
})
export class ChangePasswordCommand extends CommandRunner {
  constructor(private readonly inquirerService: InquirerService) {
    super();
  }

  async run(inputs: string[], options?: PasswordCommandOptions) {
    options = await this.inquirerService.ask('password', options);
    console.log(options);
  }

  @Option({
    flags: '-p --phone',
    description: 'phone to change password for user.',
    required: true,
  })
  phone(val: string) {
    if (isMobilePhone(val, 'en-AU', { strictMode: true })) {
      return val;
    }
    console.error('invalid phone number, please enter valid phone number.');
    process.exit(1);
  }
}
