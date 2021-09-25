import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/forgotpassword/email')
  async sendEmailForgotPassword(@Body('email') email: string): Promise<any> {
    return await this.authService.sendForgotPasswordEmail(email);
  }
}
