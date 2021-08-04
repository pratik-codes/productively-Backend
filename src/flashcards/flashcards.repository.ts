import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { Flashcard } from './Schema/Flashcard.schema';
import {
  FlashcardGroup,
  FlashcardGroupDocument,
} from './Schema/Flashcardgroup.schema';

@Injectable()
export class FlashcardGroupRepository {
  constructor(
    @InjectModel(FlashcardGroup.name)
    private FlashcardGroupModel: Model<FlashcardGroupDocument>,
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
    return this.FlashcardGroupModel.findOne(userFilterQuery);
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
    return this.FlashcardGroupModel.find(usersFilterQuery);
  }

  //   /**
  //    * Function that creates a new Flashcard group
  //    * @author   Pratik Tiwari
  //    * @param    {user} userId contains object id of the user
  //    * @param    {FlashcardGroup} FlashcardGroupDto contains data of the Flashcard group that is to be created
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   async create(
  //     user: string,
  //     flashcardGroup: FlashcardGrou,
  //   ): Promise<BasicResponse> {
  //     const FlashcardData = {
  //       user: user,
  //       groupName: FlashcardGroup.groupName,
  //       groupDescription: FlashcardGroup.groupDescription,
  //     };
  //     const newFlashcard = new this.FlashcardGroupModel(FlashcardData);
  //     try {
  //       newFlashcard.save();
  //       return { statusCode: 201, message: 'Flashcardgroup created' };
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  /**
   * Function that update a Flashcard group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {FlashcardGroupId} string contains id of the Flashcard group that needs to be updated
   * @param    {updateFlashcardDetailsDto} UpdateFlashcardDetailsDto contains data of the Flashcard group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateFlashcardsInFlashcardsGroup(
    user: string,
    FlashcardGroupId: string,
    updateFlashcardData: Flashcard,
  ): Promise<BasicResponse> {
    const FlashcardData = await this.FlashcardGroupModel.findOne({
      _id: FlashcardGroupId,
    });
    if (!FlashcardData) throw new NotFoundException();
    if (FlashcardData.user === user) throw new UnauthorizedException();
    FlashcardData.Flashcards.push(updateFlashcardData);
    try {
      FlashcardData.save();
      return { statusCode: 201, message: 'Flashcards were successfully added' };
    } catch (error) {
      return error;
    }
  }

  //   /**
  //    * Function that updates a Flashcards inside a Flashcard group
  //    * @author   Pratik Tiwari
  //    * @param    {user} userId contains object id of the user
  //    * @param    {FlashcardGroupId} string contains id of the Flashcard group that needs to be updated
  //    * @param    {updateFlashcardsFlashcardDto} UpdateFlashcardsFlashcardDto contains data of the Flashcard of the Flashcard group that is to be updated
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   async updateFlashcardsGroupDetails(
  //     user: string,
  //     FlashcardGroupId: string,
  //     updateFlashcardDetailsDto: UpdateFlashcardDetailsDto,
  //   ): Promise<BasicResponse> {
  //     const FlashcardData = await this.FlashcardGroupModel.findOne({
  //       _id: FlashcardGroupId,
  //     });
  //     if (!FlashcardData) throw new NotFoundException();
  //     if (FlashcardData.user === user) throw new UnauthorizedException();
  //     FlashcardData.groupName = updateFlashcardDetailsDto.groupName;
  //     FlashcardData.groupDescription = updateFlashcardDetailsDto.groupDescription;
  //     try {
  //       FlashcardData.save();
  //       return { statusCode: 201, message: 'Flashcards were successfully added' };
  //     } catch (error) {
  //       return error;
  //     }
  //   }

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
    const FlashcardData = await this.FlashcardGroupModel.findOne({
      _id: FlashcardGroupId,
    });
    if (!FlashcardData) throw new NotFoundException();
    if (FlashcardData.user === user) throw new UnauthorizedException();
    try {
      await this.FlashcardGroupModel.deleteOne({ _id: FlashcardGroupId });
      return {
        statusCode: 200,
        message: 'Flashcardgroup deleted successfully',
      };
    } catch (error) {
      return error;
    }
  }

  //   /**
  //    * Function that delete a Flashcard of a Flashcard group
  //    * @author   Pratik Tiwari
  //    * @param    {user} userId contains object id of the user
  //    * @param    {FlashcardGroupId} string contains id of the Flashcard group that has the Flashcard
  //    * @param    {FlashcardId} string contains id of the Flashcard group that needs to be deleted
  //    * @return   {BasicResponse} statusCode and messages
  //    */
  //   async deleteFlashcard(
  //     user: string,
  //     FlashcardGroupId: string,
  //     FlashcardId: string,
  //   ): Promise<BasicResponse> {
  //     const FlashcardData = await this.FlashcardGroupModel.findOne({
  //       _id: FlashcardGroupId,
  //     });
  //     if (!FlashcardData) throw new NotFoundException();
  //     if (FlashcardData.user === user) throw new UnauthorizedException();
  //     const AllFlashcards = FlashcardData.Flashcards;
  //     const filteredFlashcards = AllFlashcards.filter(Flashcard => {
  //       return Flashcard.FlashcardId !== FlashcardId;
  //     });
  //     FlashcardData.Flashcards = filteredFlashcards;
  //     try {
  //       FlashcardData.save();
  //       return {
  //         statusCode: 200,
  //         message: 'Flashcardgroup deleted successfully',
  //       };
  //     } catch (error) {
  //       return error;
  //     }
  //   }
}
