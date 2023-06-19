import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return loginDto;
  }
}
