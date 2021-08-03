import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { AddJournalDto } from './dtos/AddJournal.dto';
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

  /**
   * Function that updates a Journal inside a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {JournalGroupId} string contains id of the journal group that needs to be updated
   * @param    {addJournalsDto} AddJournalDto contains data of the journal of the journal group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async addJournals(
    user: string,
    JournalGroupId: string,
    addJournalsDto: AddJournalDto,
  ): Promise<BasicResponse> {
    const journalData = await this.journalModel.findOne({
      _id: JournalGroupId,
    });
    if (!journalData) throw new NotFoundException();
    if (journalData.user === user) throw new UnauthorizedException();
    const AddJournalData = {
      journalId: uuidv4(),
      journalName: addJournalsDto.journalName,
      journalDescription: addJournalsDto.journalDescription,
      journalDate: addJournalsDto.journalDate,
      ans1: addJournalsDto.ans1,
      ans2: addJournalsDto.ans2,
      ans3: addJournalsDto.ans3,
      ans4: addJournalsDto.ans4,
    };
    journalData.Journals.push(AddJournalData);
    try {
      journalData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that update a journal group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {JournalGroupId} string contains id of the journal group that needs to be updated
   * @param    {updateJournalDetailsDto} UpdateJournalDetailsDto contains data of the journal group that is to be updated
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

  /**
   * Function that deletes  a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {journalGroupId} string contains id of the journal group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteJournalGroup(
    user: string,
    journalGroupId: string,
  ): Promise<BasicResponse> {
    const journalData = await this.journalModel.findOne({
      _id: journalGroupId,
    });
    if (!journalData) throw new NotFoundException();
    if (journalData.user === user) throw new UnauthorizedException();
    try {
      await this.journalModel.deleteOne({ _id: journalGroupId });
      return { statusCode: 200, message: 'journal group deleted successfully' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that delete a journal of a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {journalGroupId} string contains id of the journal group that has the journal
   * @param    {journalId} string contains id of the journal group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteJournal(
    user: string,
    journalGroupId: string,
    journalId: string,
  ): Promise<BasicResponse> {
    console.log(journalGroupId, journalId);
    const journalData = await this.journalModel.findOne({
      _id: journalGroupId,
    });
    if (!journalData) throw new NotFoundException();
    if (journalData.user === user) throw new UnauthorizedException();
    const AllJournals = journalData.Journals;
    const filteredJournals = AllJournals.filter(journal => {
      return journal.journalId !== journalId;
    });
    journalData.Journals = filteredJournals;
    try {
      journalData.save();
      return { statusCode: 200, message: 'journal group deleted successfully' };
    } catch (error) {
      return error;
    }
  }
}
