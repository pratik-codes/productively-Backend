import { Injectable } from '@nestjs/common';
import { CreateRemainderDto } from '../Dtos/createRemainder.dto';
import { NotifyRemainderRepository } from '../repositories/notifyRemainder.repository';
import { RemainderRepository } from '../repositories/remainder.repository';

@Injectable()
export class RemainderService {
  constructor(
    private readonly remainderRepository: RemainderRepository,
    private readonly notifyRemainderRepository: NotifyRemainderRepository,
  ) {}

  /**
   * Function that gets all the remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @return   {BasicResponse + data} all remainder data
   */
  async getRemainders(userId: string) {
    const remainders = await this.remainderRepository.find({ user: userId });
    remainders.sort(function(a, b) {
      const dateA: any = new Date(a.remainderDate),
        dateB: any = new Date(b.remainderDate);
      return dateA - dateB;
    });
    const upcoming = [];
    const past = [];
    remainders.map(remainder => {
      const remainderDate = new Date(remainder.remainderDate);
      const currentDate = new Date();

      if (remainderDate >= currentDate) {
        upcoming.push(remainder);
      } else {
        past.push(remainder);
      }
    });
    return { statusCode: 200, data: { Upcoming: upcoming, Past: past } };
  }

  /**
   * Function that creates a remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {createRemainderDto} CreateRemainderDto contains data of the Remainder of the Remainder  that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async createRemainder(
    userId: string,
    createRemainderDto: CreateRemainderDto,
  ) {
    // creating remainder that the user will see in the app
    const remainderData = {
      user: userId,
      remainderName: createRemainderDto.remainderName,
      remainderDescription: createRemainderDto.remainderDescription,
      remainderDate: createRemainderDto.date,
    };

    const res = await this.remainderRepository.create(remainderData);

    // for cron job that send the notification
    const notifyRemainderData = {
      userId: userId,
      remainderName: createRemainderDto.remainderName,
      remainderDescription: createRemainderDto.remainderDescription,
      remainderDate: new Date(createRemainderDto.date),
    };

    await this.notifyRemainderRepository.create(notifyRemainderData);

    return res;
  }

  /**
   * Function that updates a Remainder inside a Remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {remainderId} string contains id of the Remainder  that needs to be updated
   * @param    {updateRemainderDto} UpdateRemainderDto contains data of the Remainder of the Remainder  that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateRemainder(
    userId: string,
    remainderId: string,
    updateRemainderDto: CreateRemainderDto,
  ) {
    return await this.remainderRepository.updateRemainderDetails(
      userId,
      remainderId,
      updateRemainderDto,
    );
  }

  /**
   * Function that deletes  a Remainder
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {RemainderId} string contains id of the Remainder  that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteRemainder(userId: string, remainderId: string) {
    return await this.remainderRepository.deleteRemainder(userId, remainderId);
  }

  /**
   * Function that delete a remainder
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {remainderIds} Array<string> contains remainder  ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipleRemainders(remainderIds: string[]) {
    return await this.remainderRepository.deleteMultipleRemainders(
      remainderIds,
    );
  }
}
