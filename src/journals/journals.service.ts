import { Injectable } from '@nestjs/common';
import { AddJournalDto } from './dtos/AddJournal.dto';
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
    const journalGroups = await this.journalGroupRepository.find({ user });
    journalGroups.map(JournalGroup => {
      JournalGroup.Journals.sort(function(a, b) {
        const dateA: any = new Date(a.journalDate),
          dateB: any = new Date(b.journalDate);
        return dateB - dateA;
      });
    });
    return { statusCode: 200, data: journalGroups };
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

  /**
   * Function that adds a journal to a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {journalGroupId} string contains id of the journal group that the journal needs to be added to
   * @param    {addJournalsDto} AddJournalDto contains data of the journals that needs to be added
   * @return   {BasicResponse} statusCode and messages
   */
  async AddJournals(
    user: string,
    journalGroupId: string,
    addJournalsDto: AddJournalDto,
  ) {
    console.log(journalGroupId);
    return await this.journalGroupRepository.addJournals(
      user,
      journalGroupId,
      addJournalsDto,
    );
  }

  /**
   * Function that deletes  a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {journalGroupId} string contains id of the journal group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteJournalGroup(user: string, journalGroupId: string) {
    return await this.journalGroupRepository.deleteJournalGroup(
      user,
      journalGroupId,
    );
  }

  /**
   * Function that delete a journal of a journal group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {journalGroupId} string contains id of the journal group that has the journal
   * @param    {journalId} string contains id of the journal group that contains the journal that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteJournal(user: string, journalGroupId: string, journalId: string) {
    return await this.journalGroupRepository.deleteJournal(
      user,
      journalGroupId,
      journalId,
    );
  }
}
