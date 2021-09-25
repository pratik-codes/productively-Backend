import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { ContactUs, ContactUsDocument } from './schema/contactus.schema';

@Injectable()
export class ContactUsRepository {
  constructor(
    @InjectModel(ContactUs.name) private userModel: Model<ContactUsDocument>,
  ) {}

  /**
   * Function that saves contact us response
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} ContactUs any data of the ContactUs
   * @return   {User} returns basic response
   */
  async create(contactus: ContactUs): Promise<BasicResponse> {
    const newUser = new this.userModel(contactus);
    try {
      newUser.save();
    } catch (error) {
      return error;
    }

    return {
      statusCode: 201,
      message: 'contactus response successfully saved!',
    };
  }
}
