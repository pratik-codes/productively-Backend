import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import {
  NotifyRemainder,
  NotifyRemainderDocument,
} from '../Schema/notifyRemainder.schema';
import { Remainder } from '../Schema/remainder.schema';

@Injectable()
export class NotifyRemainderRepository {
  constructor(
    @InjectModel(NotifyRemainder.name)
    private NotifyRemainderModel: Model<NotifyRemainderDocument>,
  ) {}

  /**
   * Function that send a all notify Remainder entity with current filters
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} Remainder any data of the Remainder  to filter the Remainder  on
   * @return   {Remainder} returns Remainder
   */
  async findAll(
    userFilterQuery: FilterQuery<NotifyRemainder>,
  ): Promise<NotifyRemainder[]> {
    return this.NotifyRemainderModel.find(userFilterQuery);
  }

  /**
   * Function that creates a new notify Remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {objectData} NotifyRemainder contains data of the Remainder  that is to be notified and the user data
   * @return   {BasicResponse} statusCode and messages
   */
  async create(objectData: NotifyRemainder): Promise<BasicResponse> {
    const newRemainder = new this.NotifyRemainderModel(objectData);

    try {
      newRemainder.save();
      return { statusCode: 201, message: 'Remainder  created' };
    } catch (error) {
      return error;
    }
  }
}
