import { Param } from '@nestjs/common';
import { Body, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Controller, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRemainderDto } from './Dtos/createRemainder.dto';
import { RemainderService } from './remainder.service';

@Controller('remainder')
@UseGuards(AuthGuard())
export class RemainderController {
  constructor(private remainderService: RemainderService) {}

  /**
   * Function that gets all the remainder of the user
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {Remainder} list of remainders of the user
   */
  @Get()
  async getRemainders(@Req() req) {
    return await this.remainderService.getRemainders(req.user._id);
  }

  /**
   * Function that creates a remainder
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {createRemainderDto} CreateRemainderDto contains data of the remainder that needs to be created
   * @return   {BasicResponse} statusCode and messages
   */
  @Post()
  async createRemainder(
    @Req() req,
    @Body() createRemainderDto: CreateRemainderDto,
  ) {
    return await this.remainderService.createRemainder(
      req.user._id,
      createRemainderDto,
    );
  }

  /**
   * Function that updates a Remainder  details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {RemainderId} RemainderId contains Remainder  id to which the details needs to be updated
   * @param    {updateRemainderDetailsDto} UpdateRemainderDetailsDto contains Remainder  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('')
  async updateRemainder(
    @Req() req,
    @Body('remainderId') remainderId: string,
    @Body('updateRemainderDto') updateRemainderDto: CreateRemainderDto,
  ) {
    return await this.remainderService.updateRemainder(
      req.user._id,
      remainderId,
      updateRemainderDto,
    );
  }

  /**
   * Function that delete a Remainder
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {remainderId} remainderId contains Remainder  id that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/:remainderId')
  async deleteRemainder(@Req() req, @Param('remainderId') remainderId: string) {
    return await this.remainderService.deleteRemainder(
      req.user._id,
      remainderId,
    );
  }
}
