import { Body, Controller, Post, Req } from '@nestjs/common';
import { Router } from 'express';
import { AuthService } from './services/auth.service';
import { OTPService } from './services/otp.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: OTPService,
  ) {}

  @Post('/forgotpassword/email')
  async sendEmailForgotPassword(
    @Req() req,
    @Body('email') email: string,
  ): Promise<any> {
    return await this.otpService.sendForgotPasswordOtpEmail(email);
  }
}
