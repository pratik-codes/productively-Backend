import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { JournalGroupDto } from './dtos/journalGroup.dto';
import { UpdateJournalDetailsDto } from './dtos/updateJournalGroup.dto';
import { Journal } from './Schema/Journal.schema';
import {
  JournalGroup,
  JournalGroupDocument,
} from './Schema/Journalgroup.schema';

@Injectable()
export class journalGroupRepository {
  constructor(
    @InjectModel(JournalGroup.name)
    private journalModel: Model<JournalGroupDocument>,
  ) {}

  /**
   * Function that send a single Task group
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} JournalGroup any data of the task group to filter the task group on
   * @return   {JournalGroup} returns task group
   */
  async findOne(
    userFilterQuery: FilterQuery<JournalGroup>,
  ): Promise<JournalGroup> {
    return this.journalModel.findOne(userFilterQuery);
  }

  /**
   * Function that send a all Task group
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} JournalGroup any data of the task group to filter the task group on
   * @return   {JournalGroup[]} returns all task group
   */
  async find(
    usersFilterQuery: FilterQuery<JournalGroup>,
  ): Promise<JournalGroup[]> {
    return this.journalModel.find(usersFilterQuery);
  }

  /**
   * Function that creates a new task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {JournalGroup} JournalGroupDto contains data of the task group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async create(
    user: string,
    JournalGroup: JournalGroupDto,
  ): Promise<BasicResponse> {
    const taskData = {
      user: user,
      groupName: JournalGroup.groupName,
      groupDescription: JournalGroup.groupDescription,
    };
    const newJournal = new this.journalModel(taskData);
    try {
      newJournal.save();
      return { statusCode: 201, message: 'JournalGroup created' };
    } catch (error) {
      return error;
    }
  }

  //   /**
  //    * Function that update a journal group details
  //    * @author   Pratik Tiwari
  //    * @param    {user} userId contains object id of the user
  //    * @param    {JournalGroupId} string contains id of the journal group that needs to be updated
  //    * @param    {updateJournalDetailsDto} UpdateJournalDetailsDto contains data of the journal group that is to be updated
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   async addJournals(
  //     user: string,
  //     JournalGroupId: string,
  //     updateJournalData: Journal,
  //   ): Promise<BasicResponse> {
  //     const journalData = await this.journalModel.findOne({
  //       _id: JournalGroupId,
  //     });
  //     if (!journalData) throw new NotFoundException();
  //     if (journalData.user === user) throw new UnauthorizedException();
  //     journalData.ans1.push = updateJournalData.ans1;
  //     try {
  //       journalData.save();
  //       return { statusCode: 201, message: 'tasks were successfully added' };
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  /**
   * Function that updates a Journal inside a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {JournalGroupId} string contains id of the journal group that needs to be updated
   * @param    {updateJournalDto} UpdateJournalDto contains data of the journal of the journal group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateJournalGroupDetails(
    user: string,
    JournalGroupId: string,
    updateTaskDetailsDto: UpdateJournalDetailsDto,
  ): Promise<BasicResponse> {
    const journalData = await this.journalModel.findOne({
      _id: JournalGroupId,
    });
    console.log(journalData);
    console.log(JournalGroupId);
    if (!journalData) throw new NotFoundException();
    if (journalData.user === user) throw new UnauthorizedException();
    journalData.groupName = updateTaskDetailsDto.groupName;
    journalData.groupDescription = updateTaskDetailsDto.groupDescription;
    try {
      journalData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
  }

  //   /**
  //    * Function that deletes  a task group
  //    * @author   Pratik Tiwari
  //    * @param    {user} userId contains object id of the user
  //    * @param    {taskGroupId} string contains id of the task group that needs to be deleted
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   async deleteTaskGroup(
  //     user: string,
  //     taskGroupId: string,
  //   ): Promise<BasicResponse> {
  //     const userData = await this.journalModel.findOne({ _id: taskGroupId });
  //     if (!userData) throw new NotFoundException();
  //     if (userData.user === user) throw new UnauthorizedException();
  //     try {
  //       await this.journalModel.deleteOne({ _id: taskGroupId });
  //       return { statusCode: 200, message: 'taskgroup deleted successfully' };
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  //   /**
  //    * Function that delete a task of a task group
  //    * @author   Pratik Tiwari
  //    * @param    {user} userId contains object id of the user
  //    * @param    {taskGroupId} string contains id of the task group that has the task
  //    * @param    {taskId} string contains id of the task group that needs to be deleted
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   async deleteTask(
  //     user: string,
  //     taskGroupId: string,
  //     taskId: string,
  //   ): Promise<BasicResponse> {
  //     const userData = await this.journalModel.findOne({ _id: taskGroupId });
  //     if (!userData) throw new NotFoundException();
  //     if (userData.user === user) throw new UnauthorizedException();
  //     const Alltasks = userData.Tasks;
  //     const filteredTasks = Alltasks.filter(task => {
  //       return task.taskId !== taskId;
  //     });
  //     userData.Tasks = filteredTasks;
  //     try {
  //       userData.save();
  //       return { statusCode: 200, message: 'taskgroup deleted successfully' };
  //     } catch (error) {
  //       return error;
  //     }
  //   }
}
