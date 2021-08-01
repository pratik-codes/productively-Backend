import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { TaskGroupDto } from './Dtos/TaskGroup-dto';
import { UpdateTaskDetailsDto } from './Dtos/updateTaskDetails.dto';
import { UpdateTasksTaskDto } from './Dtos/updateTasksTaskGroup.dto';
import { Task } from './schemas/Task.schema';
import { TaskGroup, TaskGroupDocument } from './schemas/Taskgroups.schema';

@Injectable()
export class TaskGroupRepository {
  constructor(
    @InjectModel(TaskGroup.name)
    private taskGroupModel: Model<TaskGroupDocument>,
  ) {}

  /**
   * Function that send a single Task group
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} TaskGroup any data of the task group to filter the task group on
   * @return   {TaskGroup} returns task group
   */
  async findOne(userFilterQuery: FilterQuery<TaskGroup>): Promise<TaskGroup> {
    return this.taskGroupModel.findOne(userFilterQuery);
  }

  /**
   * Function that send a all Task group
   * @author   Pratik Tiwari
   * @param    {userFilterQuery} TaskGroup any data of the task group to filter the task group on
   * @return   {TaskGroup[]} returns all task group
   */
  async find(usersFilterQuery: FilterQuery<TaskGroup>): Promise<TaskGroup[]> {
    return this.taskGroupModel.find(usersFilterQuery);
  }

  /**
   * Function that creates a new task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroup} TaskGroupDto contains data of the task group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async create(user: string, taskGroup: TaskGroupDto): Promise<BasicResponse> {
    const taskData = {
      user: user,
      groupName: taskGroup.groupName,
      groupDescription: taskGroup.groupDescription,
    };
    const newUser = new this.taskGroupModel(taskData);
    try {
      newUser.save();
      return { statusCode: 201, message: 'taskgroup created' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that update a task group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that needs to be updated
   * @param    {updateTaskDetailsDto} UpdateTaskDetailsDto contains data of the task group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTasksInTasksGroup(
    user: string,
    taskGroupId: string,
    updateTaskData: Task,
  ): Promise<BasicResponse> {
    const userData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!userData) throw new NotFoundException();
    if (userData.user === user) throw new UnauthorizedException();
    console.log(updateTaskData);
    userData.Tasks.push(updateTaskData);
    try {
      userData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that updates a tasks inside a task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that needs to be updated
   * @param    {updateTasksTaskDto} UpdateTasksTaskDto contains data of the task of the task group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTasksGroupDetails(
    user: string,
    taskGroupId: string,
    updateTaskDetailsDto: UpdateTaskDetailsDto,
  ): Promise<BasicResponse> {
    const userData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!userData) throw new NotFoundException();
    if (userData.user === user) throw new UnauthorizedException();
    userData.groupName = updateTaskDetailsDto.groupName;
    userData.groupDescription = updateTaskDetailsDto.groupDescription;
    try {
      userData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that deletes  a task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteTaskGroup(
    user: string,
    taskGroupId: string,
  ): Promise<BasicResponse> {
    const userData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!userData) throw new NotFoundException();
    if (userData.user === user) throw new UnauthorizedException();
    try {
      await this.taskGroupModel.deleteOne({ _id: taskGroupId });
      return { statusCode: 200, message: 'taskgroup deleted successfully' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that delete a task of a task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that has the task
   * @param    {taskId} string contains id of the task group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteTask(
    user: string,
    taskGroupId: string,
    taskId: string,
  ): Promise<BasicResponse> {
    const userData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!userData) throw new NotFoundException();
    if (userData.user === user) throw new UnauthorizedException();
    const Alltasks = userData.Tasks;
    const filteredTasks = Alltasks.filter(task => {
      return task.taskId !== taskId;
    });
    userData.Tasks = filteredTasks;
    try {
      userData.save();
      return { statusCode: 200, message: 'taskgroup deleted successfully' };
    } catch (error) {
      return error;
    }
  }
}
