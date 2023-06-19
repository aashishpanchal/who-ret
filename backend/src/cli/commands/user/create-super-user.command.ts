import { ROLE } from '@/apis/user/enums';
import {
  PasswordCommandOptions,
  RegisterCommandOptions,
} from '../../interfaces';
import { UserService } from '@apis/user/services';
import { Command, CommandRunner, InquirerService } from 'nest-commander';

type CommandOptions = RegisterCommandOptions & PasswordCommandOptions;

@Command({
  name: 'user:create-superuser',
  description: 'Used to create a superuser.',
})
export class CreateSuperuserCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async run(inputs: string[], options?: CommandOptions) {
    options = await this.inquirerService.ask('register', options);
    options = await this.inquirerService.ask('password', options);
    try {
      await this.userService.create({
        phone: options.phone,
        email: options.email,
        password: options.password,
        isActive: true,
        isSuperuser: true,
        role: ROLE.ADMIN,
      });
      console.log('Superuser create successfully.');
      process.exit(0);
    } catch (error) {
      console.log(error.message);
    }
  }
}
