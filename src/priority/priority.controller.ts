import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePriorityDto } from './Dtos/updatePriority.dto';
import { PriorityService } from './priority.service';

@Controller('priority')
@UseGuards(AuthGuard())
export class PriorityController {
  constructor(private priorityService: PriorityService) {}

  /**
   * Function that gets all the Priority of the user
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {Priority} list of Priority of the user
   */
  @Get()
  async getPriority(@Req() req) {
    return await this.priorityService.getPriority(req.user._id);
  }

  /**
   * Function that creates a Priority
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {createPriorityDto} CreatePriorityDto contains data of the Priority that needs to be created
   * @return   {BasicResponse} statusCode and messages
   */
  @Post()
  async createPriority(@Req() req, @Body('Priority') Priority: string) {
    return await this.priorityService.createPriority(req.user._id, Priority);
  }

  /**
   * Function that updates a Priority  details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {PriorityId} PriorityId contains Priority  id to which the details needs to be updated
   * @param    {updatePriorityDetailsDto} UpdatePriorityDetailsDto contains Priority  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('')
  async updatePriority(
    @Req() req,
    @Body('PriorityId') PriorityId: string,
    @Body('Priority') Priority: string,
  ) {
    return await this.priorityService.updatePriority(
      req.user._id,
      PriorityId,
      Priority,
    );
  }

  /**
   * Function that delete a Priority
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {PriorityId} PriorityId contains Priority  id that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/:PriorityId')
  async deletePriority(@Req() req, @Param('PriorityId') PriorityId: string) {
    return await this.priorityService.deletePriority(req.user._id, PriorityId);
  }

  /**
   * Function that delete a priority group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {priorityGroupIds} Array<string> contains priority group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Post('/delete')
  async deleteMultiplePriorities(
    @Body('prioritiesIds') prioritiesIds: string[],
  ) {
    return await this.priorityService.deleteMultiplePriority(prioritiesIds);
  }
}
