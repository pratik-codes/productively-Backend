import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Otp, OtpDocument, OtpSchema } from './schema/otp.schema';

@Injectable()
export class OTPRepository {
  constructor(@InjectModel(Otp.name) private OTPModel: Model<OtpDocument>) {}

  /**
   * Function that finds otp records
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} otp any data of the otp to filter the task group on
   * @return   {User} returns statuscode and messages
   */
  async findRecords(userFilterQuery: FilterQuery<OtpDocument>): Promise<Otp[]> {
    return this.OTPModel.find(userFilterQuery);
  }

  /**
   * Function that finds otp records
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} otp any data of the otp to filter the task group on
   * @return   {User} returns statuscode and messages
   */
  async updatePastRecords(
    userFilterQuery: FilterQuery<OtpDocument>,
  ): Promise<void> {
    await this.OTPModel.updateMany(userFilterQuery, {
      valid: false,
    });
  }

  /**
   * Function creates a otp record
   * @author   Pratik Tiwari
   * @param    {otp} OptSchema otp data
   * @return   {User} returns statuscode and message
   */
  async create(otp: Otp) {
    const otpRecord = new this.OTPModel(otp);
    try {
      return otpRecord.save();
    } catch (error) {
      return error;
    }
  }
}
