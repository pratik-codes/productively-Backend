import { Param } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddJournalDto } from './dtos/AddJournal.dto';
import { JournalGroupDto } from './dtos/journalGroup.dto';
import { UpdateJournalDetailsDto } from './dtos/updateJournalGroup.dto';
import { JournalsService } from './journals.service';

@Controller('journalgroup')
@UseGuards(AuthGuard())
export class JournalsController {
  constructor(private readonly journalService: JournalsService) {}

  /**
   * Function that return users all journal group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {JournalGroup} List of journal group of the user
   */
  @Get('')
  async getJournalGroup(@Req() req) {
    return await this.journalService.getJournalGroup(req.user._id);
  }

  /**
   * Function that creates a new journal group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {journalGroupDto} JournalGroupDto contains journal group data
   * @return   {BasicResponse} statusCode and messages
   */
  @Post('')
  async createJournalGroup(
    @Req() req,
    @Body() journalGroupDto: JournalGroupDto,
  ) {
    return await this.journalService.createJournalGroup(
      req.user._id,
      journalGroupDto,
    );
  }

  /**
   * Function that updates a journal group details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {JournalGroupId} JournalGroupId contains journal group id to which the details needs to be updated
   * @param    {updateJournalDetailsDto} UpdateJournalDetailsDto contains journal group details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('')
  async updateJournalGroupDetails(
    @Req() req,
    @Body('JournalGroupId') JournalGroupId: string,
    @Body() updateTaskDetailsDto: UpdateJournalDetailsDto,
  ) {
    return await this.journalService.updateJournalGroupDetails(
      req.user._id,
      JournalGroupId,
      updateTaskDetailsDto,
    );
  }

  /**
   * Function that adds a journal to a journal group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {journalGroupId} string contains id of the journal group that the journal needs to be added to
   * @param    {addJournalsDto} AddJournalDto contains data of the journals that needs to be added
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('journal')
  async AddJournals(
    @Req() req,
    @Body('JournalGroupId') JournalGroupId: string,
    @Body('addJournalsDto') addJournalsDto: AddJournalDto,
  ) {
    return await this.journalService.AddJournals(
      req.user._id,
      JournalGroupId,
      addJournalsDto,
    );
  }

  /**
   * Function that delete a journal group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {journalGroupId} journalGroupId contains journal group id that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/:journalGroupId')
  async deleteJournalGroup(
    @Req() req,
    @Param('journalGroupId') journalGroupId: string,
  ) {
    return await this.journalService.deleteJournalGroup(
      req.user._id,
      journalGroupId,
    );
  }

  /**
   * Function that delete a journal group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {journalGroupId} journalGroupId contains journal group id to in which the journal exists
   * @param    {journalId} journalGroupId contains journal id which is to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/journal/:journalGroupId/:journalId')
  async deleteJournalsInJournalGroup(
    @Req() req,
    @Param('journalGroupId') journalGroupId: string,
    @Param('journalId') journalId: string,
  ) {
    console.log(journalId);
    return await this.journalService.deleteJournal(
      req.user._id,
      journalGroupId,
      journalId,
    );
  }
}
