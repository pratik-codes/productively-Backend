import { Body, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddFlashCardDto } from './Dtos/addFlashCard.dto';
import { FlashcardGroupDto } from './Dtos/flashcardgroup.dto';
import { FlashcardService } from './flashcard.service';

@Controller('flashcard')
@UseGuards(AuthGuard())
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  /**
   * Function that return users all Flashcard group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {FlashcardGroup[]} List of Flashcard group of the user
   */
  @Get('')
  async getFlashcards(@Req() req) {
    return await this.flashcardService.getFlashcards(req.user._id);
  }

  /**
   * Function that creates a new Flashcard group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupDto} FlashcardGroupDto contains Flashcard group data
   * @return   {BasicResponse} statusCode and messages
   */
  @Post('')
  async createFlashcardGroup(
    @Req() req,
    @Body() flashcardGroupDto: FlashcardGroupDto,
  ) {
    return await this.flashcardService.createFlashcardGroup(
      req.user._id,
      flashcardGroupDto,
    );
  }

  /**
   * Function that updates a Flashcard group details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupId} FlashcardGroupId contains Flashcard group id to which the details needs to be updated
   * @param    {updateFlashcardDetailsDto} UpdateFlashcardDetailsDto contains Flashcard group details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('')
  async updateFlashcardGroupDetails(
    @Req() req,
    @Body('FlashcardGroupId') FlashcardGroupId: string,
    @Body('FlashcardGroupDto') flashcardGroupDto: FlashcardGroupDto,
  ) {
    return await this.flashcardService.updateFlashcardGroupDetails(
      req.user._id,
      FlashcardGroupId,
      flashcardGroupDto,
    );
  }

  /**
   * Function that adds a Flashcard to a Flashcard group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that the Flashcard needs to be added to
   * @param    {addFlashcardsDto} AddFlashcardDto contains data of the Flashcards that needs to be added
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('card')
  async AddFlashcards(
    @Req() req,
    @Body('FlashcardGroupId') FlashcardGroupId: string,
    @Body('addFlashcardsDto') addFlashcardsDto: AddFlashCardDto,
  ) {
    return await this.flashcardService.AddFlashcards(
      req.user._id,
      FlashcardGroupId,
      addFlashcardsDto,
    );
  }

  /**
   * Function that delete a Flashcard group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupId} FlashcardGroupId contains Flashcard group id that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('')
  async deleteFlashcardGroup(
    @Req() req,
    @Body('FlashcardGroupId') FlashcardGroupId: string,
  ) {
    return await this.flashcardService.deleteFlashcardGroup(
      req.user._id,
      FlashcardGroupId,
    );
  }

  /**
   * Function that delete a Flashcard group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupId} FlashcardGroupId contains Flashcard group id to in which the Flashcard exists
   * @param    {FlashcardId} FlashcardGroupId contains Flashcard id which is to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/card')
  async deleteFlashcardsInFlashcardGroup(
    @Req() req,
    @Body('FlashcardGroupId') FlashcardGroupId: string,
    @Body('FlashcardId') FlashcardId: string,
  ) {
    console.log(FlashcardId);
    return await this.flashcardService.deleteFlashcard(
      req.user._id,
      FlashcardGroupId,
      FlashcardId,
    );
  }
}
