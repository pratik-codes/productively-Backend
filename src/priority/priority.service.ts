import { Injectable } from '@nestjs/common';
import { UpdatePriorityDto } from './Dtos/updatePriority.dto';
import { PriorityRepository } from './Priority.repository';

@Injectable()
export class PriorityService {
  constructor(private readonly priorityRepository: PriorityRepository) {}

  /**
   * Function that gets all the Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @return   {BasicResponse + data} all Priority data
   */
  async getPriority(userId: string) {
    const Priorities = await this.priorityRepository.find({ user: userId });

    return { statusCode: 200, data: Priorities };
  }

  /**
   * Function that creates a Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {createPriorityDto} CreatePriorityDto contains data of the Priority of the Priority  that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async createPriority(userId: string, Priority: string) {
    const PriorityData = {
      user: userId,
      priority: Priority,
    };
    return await this.priorityRepository.create(PriorityData);
  }

  /**
   * Function that updates a Priority inside a Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {PriorityId} string contains id of the Priority  that needs to be updated
   * @param    {updatePriorityDto} UpdatePriorityDto contains data of the Priority of the Priority  that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updatePriority(userId: string, PriorityId: string, Priority: string) {
    return await this.priorityRepository.updatePriority(
      userId,
      PriorityId,
      Priority,
    );
  }

  /**
   * Function that deletes  a Priority
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {PriorityId} string contains id of the Priority  that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deletePriority(userId: string, PriorityId: string) {
    return await this.priorityRepository.deletePriority(userId, PriorityId);
  }

  /**
   * Function that delete a priority
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {priorityIds} Array<string> contains priority ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultiplePriority(priorityIds: string[]) {
    return await this.priorityRepository.deleteMultiplePriority(priorityIds);
  }
}
