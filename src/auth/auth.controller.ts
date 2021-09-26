import { Body, Controller, Post, Req } from '@nestjs/common';
import { Router } from 'express';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { AuthService } from './services/auth.service';
import { OTPService } from './services/otp.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: OTPService,
  ) {}

  /**
   * Function creates a otp record sends an email to the user for same
   * @author   Pratik Tiwari
   * @param    {email} string USER EMAIL
   * @return   {basicResponse} returns status code and message Promise<basicResponse>
   */
  @Post('/forgotpassword/email')
  async sendEmailForgotPassword(
    @Req() req,
    @Body('email') email: string,
  ): Promise<any> {
    return await this.otpService.sendForgotPasswordOtpEmail(email);
  }

  /**
   * Function that finds otp and validates if its correcot or not
   * @author   Pratik Tiwari
   * @param    {email} string<user> email id of the user
   * @param    {OTP} number OTP the user want to validate
   * @return   {basicResponse} returns status code and message Promise<basicResponse>
   */
  @Post('/forgotpassword/validate')
  async validateOTP(
    @Body('email') email: string,
    @Body('OTP') OTP: number,
  ): Promise<BasicResponse> {
    return await this.otpService.validateOTP(email, OTP);
  }

  /**
   * Function that finds a user and update the password
   * @author   Pratik Tiwari
   * @param    {email} string<user> email id of the user
   * @param    {newPassword} string<user> new password that the user wants to update
   * @return   {User} returns user
   */
  @Post('/forgotpassword/update')
  async updatePassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
  ): Promise<BasicResponse> {
    return await this.otpService.updatePassword(email, newPassword);
  }
}
