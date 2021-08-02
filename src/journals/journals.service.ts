import { Injectable } from '@nestjs/common';
import { JournalGroupDto } from './dtos/journalGroup.dto';
import { UpdateJournalDetailsDto } from './dtos/updateJournalGroup.dto';
import { journalGroupRepository } from './journals.repository';

@Injectable()
export class JournalsService {
  constructor(
    private readonly journalGroupRepository: journalGroupRepository,
  ) {}

  /**
   * Function that returns all the journal groups of a user
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @return   {journalGroup} returns all the journal group of the user
   */
  async getJournalGroup(user: string) {
    return await this.journalGroupRepository.find({ user });
  }

  /**
   * Function that creates a new journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {JournalGroupDto} JournalGroupDto contains data of the journal group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async createJournalGroup(user: string, journalGroupDto: JournalGroupDto) {
    return await this.journalGroupRepository.create(user, journalGroupDto);
  }

  /**
   * Function that update a journal group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {journalGroupId} string contains id of the journal group that needs to be updated
   * @param    {updateJournalDetailsDto} UpdateTaskDetailsDto contains data of the journal group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateJournalGroupDetails(
    user: string,
    journalGroupId: string,
    updateTaskDetailsDto: UpdateJournalDetailsDto,
  ) {
    console.log(journalGroupId);
    return await this.journalGroupRepository.updateJournalGroupDetails(
      user,
      journalGroupId,
      updateTaskDetailsDto,
    );
  }
}
