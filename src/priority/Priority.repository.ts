import {
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { UpdatePriorityDto } from './Dtos/updatePriority.dto';
import { Priority, PriorityDocument } from './Schema/priority.schema';

@Injectable()
export class PriorityRepository {
  constructor(
    @InjectModel(Priority.name)
    private PriorityModel: Model<PriorityDocument>,
  ) {}

  /**
   * Function that send a single Priority
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} Priority any data of the Priority  to filter the Priority  on
   * @return   {Priority} returns Priority
   */
  async findOne(userFilterQuery: FilterQuery<Priority>): Promise<Priority> {
    return this.PriorityModel.findOne(userFilterQuery);
  }

  /**
   * Function that send a all Priority
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} Priority any data of the Priority  to filter the Priority  on
   * @return   {Priority[]} returns all Priority
   */
  async find(usersFilterQuery: FilterQuery<Priority>): Promise<Priority[]> {
    return this.PriorityModel.find(usersFilterQuery);
  }

  /**
   * Function that creates a new Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {Priority} PriorityDto contains data of the Priority  that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async create(PriorityData: Priority): Promise<BasicResponse> {
    const newPriority = new this.PriorityModel(PriorityData);

    try {
      newPriority.save();
      return { statusCode: 201, message: 'Priority  created' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that updates a Priority inside a Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {PriorityId} string contains id of the Priority  that needs to be updated
   * @param    {updatePriorityPriorityDto} UpdatePriorityPriorityDto contains data of the Priority of the Priority  that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updatePriority(
    user: string,
    PriorityId: string,
    Priority: string,
  ): Promise<BasicResponse> {
    const PriorityData = await this.PriorityModel.findOne({
      _id: PriorityId,
    });
    if (!PriorityData) throw new NotFoundException();
    if (PriorityData.user === user) throw new UnauthorizedException();
    PriorityData.priority = Priority;

    try {
      PriorityData.save();
      return { statusCode: 201, message: 'Priority were successfully added' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that deletes  a Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {PriorityId} string contains id of the Priority  that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deletePriority(
    user: string,
    PriorityId: string,
  ): Promise<BasicResponse> {
    const PriorityData = await this.PriorityModel.findOne({
      _id: PriorityId,
    });
    if (!PriorityData) throw new NotFoundException();
    if (PriorityData.user === user) throw new UnauthorizedException();
    try {
      await this.PriorityModel.deleteOne({ _id: PriorityId });
      return { statusCode: 200, message: 'Priority deleted successfully' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that delete a priority
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {priorityIds} Array<string> contains priority  ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultiplePriority(priorityIds: string[]) {
    // checking and sending error if any s isnt present
    try {
      const priority = await this.PriorityModel.find({
        _id: priorityIds,
      });
    } catch (error) {
      return error;
    }

    // deleting all the
    try {
      await this.PriorityModel.deleteMany({ _id: priorityIds });
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'priority s deleted successfully',
    };
  }
}
