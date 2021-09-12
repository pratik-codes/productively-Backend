import {
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { CreateRemainderDto } from './Dtos/createRemainder.dto';
import { Remainder, RemainderDocument } from './Schema/remainder.schema';

@Injectable()
export class RemainderRepository {
  constructor(
    @InjectModel(Remainder.name)
    private RemainderModel: Model<RemainderDocument>,
  ) {}

  /**
   * Function that send a single Remainder
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} Remainder any data of the Remainder  to filter the Remainder  on
   * @return   {Remainder} returns Remainder
   */
  async findOne(userFilterQuery: FilterQuery<Remainder>): Promise<Remainder> {
    return this.RemainderModel.findOne(userFilterQuery);
  }

  /**
   * Function that send a all Remainder
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} Remainder any data of the Remainder  to filter the Remainder  on
   * @return   {Remainder[]} returns all Remainder
   */
  async find(usersFilterQuery: FilterQuery<Remainder>): Promise<Remainder[]> {
    return this.RemainderModel.find(usersFilterQuery);
  }

  /**
   * Function that creates a new Remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {Remainder} RemainderDto contains data of the Remainder  that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async create(remainderData: Remainder): Promise<BasicResponse> {
    const newRemainder = new this.RemainderModel(remainderData);

    try {
      newRemainder.save();
      return { statusCode: 201, message: 'Remainder  created' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that updates a Remainder inside a Remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {RemainderId} string contains id of the Remainder  that needs to be updated
   * @param    {updateRemainderRemainderDto} UpdateRemainderRemainderDto contains data of the Remainder of the Remainder  that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateRemainderDetails(
    user: string,
    remainderId: string,
    updateRemainderDto: CreateRemainderDto,
  ): Promise<BasicResponse> {
    const remainderData = await this.RemainderModel.findOne({
      _id: remainderId,
    });
    if (!remainderData) throw new NotFoundException();
    if (remainderData.user === user) throw new UnauthorizedException();
    remainderData.remainderName = updateRemainderDto.remainderName;
    remainderData.remainderDescription =
      updateRemainderDto.remainderDescription;
    remainderData.remainderDate = updateRemainderDto.date;
    try {
      remainderData.save();
      return { statusCode: 201, message: 'Remainder were successfully added' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that deletes  a Remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {RemainderId} string contains id of the Remainder  that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteRemainder(
    user: string,
    remainderId: string,
  ): Promise<BasicResponse> {
    const RemainderData = await this.RemainderModel.findOne({
      _id: remainderId,
    });
    if (!RemainderData) throw new NotFoundException();
    if (RemainderData.user === user) throw new UnauthorizedException();
    try {
      await this.RemainderModel.deleteOne({ _id: remainderId });
      return { statusCode: 200, message: 'Remainder deleted successfully' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that delete a remaidner
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {remainderIds} Array<string> contains remaidner ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipleRemainders(remainderIds: string[]) {
    // checking and sending error if anys isnt present
    try {
      const remainders = await this.RemainderModel.find({
        _id: remainderIds,
      });
    } catch (error) {
      return error;
    }

    // deleting all the
    try {
      await this.RemainderModel.deleteMany({ _id: remainderIds });
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'reminders deleted successfully',
    };
  }
}
