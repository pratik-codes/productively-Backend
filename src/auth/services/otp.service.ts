import { Injectable, NotFoundException } from '@nestjs/common';
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
   * @return   {User} returns statuscode and message
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
      });
    }, 300000);

    return { statusCode: '201', message: 'email sent!' };
  }
}
