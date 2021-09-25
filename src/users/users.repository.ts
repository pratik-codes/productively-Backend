import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.logger.log('Mongoose database connection success');
  }

  /**
   * Function that send a single User details
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} User any data of the User to filter the task group on
   * @return   {User} returns user
   */
  async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  /**
   * Function that finds User
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} User any data of the User to filter the task group on
   * @return   {User} returns user
   */
  async find(usersFilterQuery: FilterQuery<UserDocument>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery);
  }

  /**
   * Function that send a single User details
   * @author   Pratik Tiwari
   * @param    {user} User any data of the User to eb created
   * @return   {User} returns user
   */
  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    try {
      return newUser.save();
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that finds a user and update the details
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} FilterQuery<user> any data of the User
   * @return   {User} returns user
   */
  async findOneAndUpdate(
    userFilterQuery: FilterQuery<UserDocument>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }
}
