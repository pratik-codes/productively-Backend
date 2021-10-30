import { BadRequestException, Injectable } from '@nestjs/common';
import { AddFlashCardDto } from './Dtos/AddFlashCard.dto';
import { EditFlashcardDto } from './Dtos/editFlashcard.dto';
import { FlashcardGroupDto } from './Dtos/flashcardgroup.dto';
import { FlashcardGroupRepository } from './flashcard.repository';

@Injectable()
export class FlashcardService {
  constructor(private flashcardGroupRepository: FlashcardGroupRepository) {}

  /**
   * Function that return users all Flashcard group
   * @author   Pratik Tiwari
   * @param    {userId} string user id
   * @return   {FlashcardGroup[]} List of Flashcard group of the user
   */
  async getFlashcardGroups(userId: string) {
    return await this.flashcardGroupRepository.find({ user: userId });
  }

  /**
   * Function that return all flashcard of a  flashcard groups
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {flashcardGroupId} List of flashcard groups of the user
   */
  async getFlashcards(flashcardGroupId: string, userId: string) {
    const flashcardGroup: any = await this.flashcardGroupRepository.findOne({
      _id: flashcardGroupId,
    });

    if (String(flashcardGroup.user) != String(userId)) {
      throw new BadRequestException('This task doesnt belong to you ');
    }

    return { message: 'flashcard retrived successfully', data: flashcardGroup };
  }

  /**
   * Function that creates a new Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupDto} FlashcardGroupDto contains data of the Flashcard group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async createFlashcardGroup(
    user: string,
    flashcardGroupDto: FlashcardGroupDto,
  ) {
    return await this.flashcardGroupRepository.create(user, flashcardGroupDto);
  }

  /**
   * Function that update a Flashcard group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that needs to be updated
   * @param    {flashcardGroupDto} FlashcardGroupDto contains data of the Flashcard group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateFlashcardGroupDetails(
    user: string,
    FlashcardGroupId: string,
    flashcardGroupDto: FlashcardGroupDto,
  ) {
    return await this.flashcardGroupRepository.updateFlashcardGroupDetails(
      user,
      FlashcardGroupId,
      flashcardGroupDto,
    );
  }

  /**
   * Function that updates a Flashcard details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupId} string contains Flashcard group id to which the details needs to be updated
   * @param    {FlashcardId} string contains Flashcard group id to which the details needs to be updated
   * @param    {editFlashcardDto} EditFlashcardDto contains Flashcard  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async editFlashcardDetails(
    user: string,
    FlashcardGroupId: string,
    flashcardId: string,
    editFlashcardDto: EditFlashcardDto,
  ) {
    return await this.flashcardGroupRepository.updateFlashcardDetails(
      user,
      FlashcardGroupId,
      flashcardId,
      editFlashcardDto,
    );
  }

  /**
   * Function that updates a Flashcard data
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {FlashcardGroupId} string contains Flashcard group id to which the details needs to be updated
   * @param    {FlashcardId} string contains Flashcard group id to which the details needs to be updated
   * @param    {data} string contains Flashcard  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async editFlashcardData(
    user: string,
    FlashcardGroupId: string,
    FlashcardId: string,
    data: string,
  ) {
    return await this.flashcardGroupRepository.updateFlashcardData(
      user,
      FlashcardGroupId,
      FlashcardId,
      data,
    );
  }

  /**
   * Function that adds a Flashcard to a Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that the Flashcard needs to be added to
   * @param    {addFlashcardsDto} AddFlashcardDto contains data of the Flashcards that needs to be added
   * @return   {BasicResponse} statusCode and messages
   */
  async AddFlashcards(
    user: string,
    FlashcardGroupId: string,
    addFlashCardDto: AddFlashCardDto,
  ) {
    return await this.flashcardGroupRepository.addFlashcards(
      user,
      FlashcardGroupId,
      addFlashCardDto,
    );
  }

  /**
   * Function that deletes  a Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteFlashcardGroup(user: string, FlashcardGroupId: string) {
    return await this.flashcardGroupRepository.deleteFlashcardGroup(
      user,
      FlashcardGroupId,
    );
  }

  /**
   * Function that delete a Flashcard of a Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that has the Flashcard
   * @param    {FlashcardId} string contains id of the Flashcard group that contains the Flashcard that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteFlashcard(
    user: string,
    FlashcardGroupId: string,
    FlashcardId: string,
  ) {
    return await this.flashcardGroupRepository.deleteFlashcard(
      user,
      FlashcardGroupId,
      FlashcardId,
    );
  }

  /**
   * Function that delete a Flashcard group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {flashcardGroupIds} Array<string> contains Flashcard group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipleFlashcardGroups(flashcardGroupIds: string[]) {
    return await this.flashcardGroupRepository.deleteMultipleFlashcardGroups(
      flashcardGroupIds,
    );
  }

  /**
   * Function that delete all the flashcards id that are mentioned
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {flashcardGroupId} string contains Flashcard group ids that needs to be deleted
   * @param    {flashcardIds} Array<string> contains Flashcard group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipleFlashcard(
    flashcardGroupId: string,
    flashcardIds: string[],
  ) {
    return await this.flashcardGroupRepository.deleteMultipleFlashcard(
      flashcardGroupId,
      flashcardIds,
    );
  }
}
