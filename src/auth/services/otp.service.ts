import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { UsersService } from 'src/users/users.service';
import { EmailerService } from 'src/utility/emailer/emailer.service';
import { OTPRepository } from '../otp.repository';
import { Otp } from '../schema/otp.schema';
@Injectable()
export class OTPService {
  constructor(
    private usersService: UsersService,
    private emailerService: EmailerService,
    private otpRepository: OTPRepository,
  ) {}

  /**
   * Function creates a otp record sends an email to the user for same
   * @author   Pratik Tiwari
   * @param    {email} string USER EMAIL
   * @return   {basicResponse} returns status code and message Promise<basicResponse>
   */
  async sendForgotPasswordOtpEmail(email: string) {
    //send only if the user exsists
    const user: any = await this.usersService.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found.');

    // creating otp to be sent
    const OTP = Math.floor(1000 + Math.random() * 9000);
    console.log(OTP);

    //updating all past otp if there are any valid making them invalid
    await this.otpRepository.updatePastRecords({
      email: email,
      valid: true,
      authType: 'FORGOT_PASSWORD',
    });

    // creating an otp record
    const OtpRecordData: Otp = {
      otp: OTP,
      userId: user._id,
      email: email,
      createdAt: new Date(),
      authType: 'FORGOT_PASSWORD',
      valid: true,
    };
    await this.otpRepository.create(OtpRecordData);

    // sending otp email
    await this.emailerService.sendForgotPasswordTemplateViaEmail(email, OTP);

    // if the otp is not used this will make the otp invalid in 5 minutes
    setTimeout(async () => {
      await this.otpRepository.updatePastRecords({
        email: email,
        valid: true,
        authType: 'FORGOT_PASSWORD',
      });
    }, 300000);

    return { statusCode: '201', message: 'email sent!' };
  }

  /**
   * Function that finds otp and validates if its correcot or not
   * @author   Pratik Tiwari
   * @param    {email} string<user> email id of the user
   * @param    {OTP} number OTP the user want to validate
   * @return   {basicResponse} returns status code and message Promise<basicResponse>
   */
  async validateOTP(email: string, OTP: number): Promise<BasicResponse> {
    const OTPRecordsRes: Otp[] = await this.otpRepository.findRecords({
      email: email,
      valid: true,
      authType: 'FORGOT_PASSWORD',
    });

    if (OTPRecordsRes[0].otp === OTP) {
      // as the otp is correct it user will be forwarded to next step and hence this otp shouldnt bbe used any more hence making it invalid
      await this.otpRepository.updatePastRecords({
        email: email,
        valid: true,
        authType: 'FORGOT_PASSWORD',
      });

      return { statusCode: 200, message: 'correct otp!' };
    }

    throw new UnauthorizedException('wrong otp entered!');
  }

  /**
   * Function that finds a user and update the password
   * @author   Pratik Tiwari
   * @param    {email} string<user> email id of the user
   * @param    {newPassword} string<user> new password that the user wants to update
   * @return   {basicResponse} returns status code and message Promise<basicResponse>
   */
  async updatePassword(
    email: string,
    newPassword: string,
  ): Promise<BasicResponse> {
    return await this.usersService.updateUserPassword(email, newPassword);
  }
}
