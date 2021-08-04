import { Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FlashcardGroupDto } from './Dtos/flashcardgroup.dto';
import { AddFlashCardDto } from './Dtos/updateFlashcard.dto';
import { UpdateFlashcardDetailsDto } from './Dtos/updateFlashcardGroupDetails.dto';
import { FlashcardsService } from './Flashcards.service';

@Controller('Flashcardgroup')
@UseGuards(AuthGuard())
export class FlashcardsController {
  constructor(private readonly FlashcardsService: FlashcardsService) {}

  /**
   * Function that return users all Flashcards groups
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {FlashcardGroup} List of Flashcards groups of the user
   */
  @Get('')
  async getFlashcardsGroup(@Req() req) {
    return await this.FlashcardsService.getFlashcardGroup(req.user._id);
  }

  /**
   * Function that creates a new Flashcards group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardsGroupDto} FlashcardsGroupDto contains Flashcards group data
   * @return   {BasicResponse} statusCode and messages
   */
  @Post('')
  async createFlashcardsGroup(
    @Req() req,
    @Body() FlashcardsGroupDto: FlashcardGroupDto,
  ) {
    return await this.FlashcardsService.createFlashcards(
      req.user._id,
      FlashcardsGroupDto,
    );
  }

  /**
   * Function that updates a Flashcards group details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardsGroupId} FlashcardsGroupId contains Flashcards group id to which the details needs to be updated
   * @param    {updateFlashcardsDetailsDto} UpdateFlashcardsDetailsDto contains Flashcards group details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('')
  async updateFlashcardsGroup(
    @Req() req,
    @Body('FlashcardsGroupId') FlashcardsGroupId: string,
    @Body() updateFlashcardsDetailsDto: UpdateFlashcardDetailsDto,
  ) {
    return await this.FlashcardsService.updateFlashcardGroupDetails(
      req.user._id,
      FlashcardsGroupId,
      updateFlashcardsDetailsDto,
    );
  }

  //   /**
  //    * Function that creates a new Flashcards inside a Flashcards group
  //    * @author   Pratik Tiwari
  //    * @param    {Req} request the http request by the clients
  //    * @param    {FlashcardsGroupId} FlashcardsGroupId contains Flashcards group id to which the Flashcards is added to
  //    * @param    {updateFlashcardsFlashcardsDto} UpdateFlashcardsFlashcardsDto contains Flashcards data that needs to be added
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   @Patch('Flashcards')
  //   async uodateFlashcardsInFlashcardsGroup(
  //     @Req() req,
  //     @Body('FlashcardsGroupId') FlashcardsGroupId: string,
  //     @Body() AddFlashCardDto: AddFlashCardDto,
  //   ) {
  //     return await this.FlashcardsService.updateFlashCardsInFlashcardGroup(
  //       req.user._id,
  //       FlashcardsGroupId,
  //       AddFlashCardDto,
  //     );
  //   }

  /**
   * Function that delete a Flashcards group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardsGroupId} FlashcardsGroupId contains Flashcards group id that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('')
  async deleteFlashcardsGroup(
    @Req() req,
    @Body('FlashcardsGroupId') FlashcardsGroupId: string,
  ) {
    return await this.FlashcardsService.deleteFlashcardGroup(
      req.user._id,
      FlashcardsGroupId,
    );
  }

  /**
   * Function that delete a Flashcards group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardsGroupId} FlashcardsGroupId contains Flashcards group id to in which the Flashcards exists
   * @param    {FlashcardsId} FlashcardsGroupId contains Flashcards id which is to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/Flashcards')
  async deleteFlashcardsInFlashcardsGroup(
    @Req() req,
    @Body('FlashcardsGroupId') FlashcardsGroupId: string,
    @Body('FlashcardsId') FlashcardsId: string,
  ) {
    console.log(FlashcardsId);
    return await this.FlashcardsService.deleteFlashcards(
      req.user._id,
      FlashcardsGroupId,
      FlashcardsId,
    );
  }
}
