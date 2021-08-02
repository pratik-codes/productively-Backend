import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  async updateTaskGroup(
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
}
