import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FlashcardGroupDto } from './Dtos/flashcardgroup.dto';
import { AddFlashCardDto } from './Dtos/updateFlashcard.dto';
import { UpdateFlashcardDetailsDto } from './Dtos/updateFlashcardGroupDetails.dto';
import { FlashcardGroupRepository } from './flashcards.repository';
import { FlashcardGroup } from './Schema/Flashcardgroup.schema';

@Injectable()
export class FlashcardsService {
  constructor(
    private readonly FlashcardGroupRepository: FlashcardGroupRepository,
  ) {}

  /**
   * Function that returns all the FlashCards groups of a user
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @return   {FlashcardGroup} returns all the FlashCards group of the user
   */
  async getFlashcardGroup(user: string) {
    const FlashcardGroups = await this.FlashcardGroupRepository.find({
      user,
    });

    return { statusCode: 200, data: FlashcardGroups };
  }

  /**
   * Function that creates a new task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupDto} TaskGroupDto contains data of the task group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async createFlashCardGroup(
    user: string,
    flashcardGroupDto: FlashcardGroupDto,
  ) {
    console.log(flashcardGroupDto);

    return await this.FlashcardGroupRepository.create(user, flashcardGroupDto);
  }

  /**
   * Function that update a FlashCards group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the FlashCards group that needs to be updated
   * @param    {updateFlashCardsDetailsDto} UpdateFlashCardsDetailsDto contains data of the FlashCards group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateFlashcardGroupDetails(
    user: string,
    FlashcardGroupId: string,
    updateFlashcardDetailsDto: UpdateFlashcardDetailsDto,
  ) {
    return await this.FlashcardGroupRepository.updateFlashcardsGroupDetails(
      user,
      FlashcardGroupId,
      updateFlashcardDetailsDto,
    );
  }

  /**
   * Function that updates a Flashcards inside a FlashCards group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the FlashCards group that needs to be updated
   * @param    {updateFlashcardsFlashCardsDto} UpdateFlashcardsFlashCardsDto contains data of the FlashCards of the FlashCards group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async addFlashCard(
    user: string,
    FlashcardGroupId: string,
    addFlashCardDto: AddFlashCardDto,
  ) {
    const FlashcardsData = {
      flashcardId: uuidv4(),
      flashcardName: addFlashCardDto.flashcardName,
      flashcardDescription: addFlashCardDto.flashcardDescription,
      data: addFlashCardDto.data,
    };
    return await this.FlashcardGroupRepository.addFlashcard(
      user,
      FlashcardGroupId,
      FlashcardsData,
    );
  }

  /**
   * Function that deletes  a FlashCards group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the FlashCards group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteFlashcardGroup(user: string, FlashcardGroupId: string) {
    return await this.FlashcardGroupRepository.deleteFlashcardGroup(
      user,
      FlashcardGroupId,
    );
  }

  /**
   * Function that delete a FlashCards of a FlashCards group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the FlashCards group that has the FlashCards
   * @param    {FlashCardsId} string contains id of the FlashCards group that contains the FlashCards that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteFlashcards(
    user: string,
    FlashcardGroupId: string,
    FlashCardsId: string,
  ) {
    // return await this.FlashcardGroupRepository.deleteFlashcard(
    //   user,
    //   FlashcardGroupId,
    //   FlashCardsId,
    // );
  }
}
