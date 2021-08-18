import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import {
  FlashcardGroup,
  FlashcardGroupDocument,
} from './Schema/flashcardgroup.schema';
import { FlashcardGroupDto } from './Dtos/flashcardgroup.dto';
import { AddFlashCardDto } from './Dtos/AddFlashCard.dto';
import { EditFlashcardDto } from './Dtos/editFlashcard.dto';

@Injectable()
export class FlashcardGroupRepository {
  constructor(
    @InjectModel(FlashcardGroup.name)
    private FlashcardModel: Model<FlashcardGroupDocument>,
  ) {}

  /**
   * Function that send a single Flashcard group
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} FlashcardGroup any data of the Flashcard group to filter the Flashcard group on
   * @return   {FlashcardGroup} returns Flashcard group
   */
  async findOne(
    userFilterQuery: FilterQuery<FlashcardGroup>,
  ): Promise<FlashcardGroup> {
    return this.FlashcardModel.findOne(userFilterQuery);
  }

  /**
   * Function that send a all Flashcard group
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} FlashcardGroup any data of the Flashcard group to filter the Flashcard group on
   * @return   {FlashcardGroup[]} returns all Flashcard group
   */
  async find(
    usersFilterQuery: FilterQuery<FlashcardGroup>,
  ): Promise<FlashcardGroup[]> {
    return this.FlashcardModel.find(usersFilterQuery);
  }

  /**
   * Function that creates a new Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroup} FlashcardGroupDto contains data of the task group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async create(
    user: string,
    flashcardGroupDto: FlashcardGroupDto,
  ): Promise<BasicResponse> {
    const FlashcardModelData = {
      user: user,
      groupName: flashcardGroupDto.groupName,
      groupDescription: flashcardGroupDto.groupDescription,
    };
    const newFlashcardGroup = new this.FlashcardModel(FlashcardModelData);
    try {
      newFlashcardGroup.save();
      return { statusCode: 201, message: 'FlashcardGroup created' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that updates a Flashcard inside a Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that needs to be updated
   * @param    {addFlashcardsDto} AddFlashcardDto contains data of the Flashcard of the Flashcard group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async addFlashcards(
    user: string,
    FlashcardGroupId: string,
    addFlashcardsDto: AddFlashCardDto,
  ): Promise<BasicResponse> {
    const FlashcardData = await this.FlashcardModel.findOne({
      _id: FlashcardGroupId,
    });
    if (!FlashcardData) throw new NotFoundException();
    if (FlashcardData.user === user) throw new UnauthorizedException();
    const AddFlashcardData = {
      flashcardId: uuidv4(),
      flashcardName: addFlashcardsDto.flashcardName,
      flashcardDescription: addFlashcardsDto.flashcardDescription,
      data: addFlashcardsDto.data,
    };
    FlashcardData.flashcard.push(AddFlashcardData);
    try {
      FlashcardData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
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
  ): Promise<BasicResponse> {
    const FlashcardData = await this.FlashcardModel.findOne({
      _id: FlashcardGroupId,
    });
    if (!FlashcardData) throw new NotFoundException();
    if (FlashcardData.user === user) throw new UnauthorizedException();
    FlashcardData.groupName = flashcardGroupDto.groupName;
    FlashcardData.groupDescription = flashcardGroupDto.groupDescription;
    try {
      FlashcardData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
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
  async updateFlashcardDetails(
    user: string,
    FlashcardGroupId: string,
    flashcardId: string,
    editFlashcardDto: EditFlashcardDto,
  ) {
    const FlashcardData = await this.FlashcardModel.findOne({
      _id: FlashcardGroupId,
    });
    let updateObject;
    if (!FlashcardData) throw new NotFoundException();

    // remove the flashcard the needs to be changed
    const flashcards = [];
    FlashcardData.flashcard.map(flashcard => {
      if (flashcard.flashcardId !== flashcardId) {
        flashcards.push(flashcard);
      } else {
        updateObject = flashcard;
      }
    });
    // change the details and push it back
    flashcards.push({
      flashcardId: updateObject.flashcardId,
      flashcardName: editFlashcardDto.flashcardName,
      flashcardDescription: editFlashcardDto.flashcardDescription,
      data: updateObject.data,
    });
    // put it back in the object and save it
    FlashcardData.flashcard = flashcards;
    try {
      FlashcardData.save();
      return { statusCode: 201, message: 'tasks was successfully updated' };
    } catch (error) {
      return error;
    }
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
  async updateFlashcardData(
    user: string,
    FlashcardGroupId: string,
    FlashcardId: string,
    data: string,
  ) {
    const FlashcardData = await this.FlashcardModel.findOne({
      _id: FlashcardGroupId,
    });
    let updateObject;
    if (!FlashcardData) throw new NotFoundException();

    // remove the flashcard the needs to be changed
    const flashcards = [];
    FlashcardData.flashcard.map(flashcard => {
      if (flashcard.flashcardId !== FlashcardId) {
        flashcards.push(flashcard);
      } else {
        updateObject = flashcard;
      }
    });
    // change the details and push it back
    flashcards.push({
      flashcardId: updateObject.flashcardId,
      flashcardName: updateObject.flashcardName,
      flashcardDescription: updateObject.flashcardDescription,
      data: data,
    });
    // put it back in the object and save it
    FlashcardData.flashcard = flashcards;
    try {
      FlashcardData.save();
      return { statusCode: 201, message: 'tasks was successfully updated' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that deletes  a Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteFlashcardGroup(
    user: string,
    FlashcardGroupId: string,
  ): Promise<BasicResponse> {
    const FlashcardData = await this.FlashcardModel.findOne({
      _id: FlashcardGroupId,
    });
    if (!FlashcardData) throw new NotFoundException();
    if (FlashcardData.user === user) throw new UnauthorizedException();
    try {
      await this.FlashcardModel.deleteOne({ _id: FlashcardGroupId });
      return {
        statusCode: 200,
        message: 'Flashcard group deleted successfully',
      };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that delete a Flashcard of a Flashcard group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that has the Flashcard
   * @param    {FlashcardId} string contains id of the Flashcard group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteFlashcard(
    user: string,
    FlashcardGroupId: string,
    FlashcardId: string,
  ): Promise<BasicResponse> {
    const FlashcardData = await this.FlashcardModel.findOne({
      _id: FlashcardGroupId,
    });
    if (!FlashcardData) throw new NotFoundException();
    if (FlashcardData.user === user) throw new UnauthorizedException();
    const AllFlashcards = FlashcardData.flashcard;
    const filteredFlashcards = AllFlashcards.filter(Flashcard => {
      return Flashcard.flashcardId !== FlashcardId;
    });
    FlashcardData.flashcard = filteredFlashcards;
    try {
      FlashcardData.save();
      return {
        statusCode: 200,
        message: 'Flashcard group deleted successfully',
      };
    } catch (error) {
      return error;
    }
  }
}
