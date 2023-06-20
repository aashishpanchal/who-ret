import {
  PasswordCommandOptions,
  RegisterCommandOptions,
} from '../../interfaces';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { UserCommandService } from '@cli/services';

type CommandOptions = RegisterCommandOptions & PasswordCommandOptions;

@Command({
  name: 'user:create-superuser',
  description: 'Used to create a superuser.',
})
export class CreateSuperuserCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly userCommandService: UserCommandService,
  ) {
    super();
  }

  async run(inputs: string[], options?: CommandOptions) {
    options = await this.inquirerService.ask('register', options);
    options = await this.inquirerService.ask('password', options);
    try {
      await this.userCommandService.createSuperuser(
        options.phone,
        options.email,
        options.password,
      );
      console.log('Superuser create successfully.');
      process.exit(0);
    } catch (error) {
      console.log(error.message);
    }
  }
}
