import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BasicResponse } from 'src/Types/TaskGroup.types';
import { EditTaskDto } from './Dtos/editTask.dto';
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
    const newTask = new this.taskGroupModel(taskData);

    try {
      newTask.save();
      return { statusCode: 201, message: 'task group created' };
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
    const taskData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!taskData) throw new NotFoundException();
    if (taskData.user === user) throw new UnauthorizedException();
    taskData.Tasks.push(updateTaskData);
    try {
      taskData.save();
      return { statusCode: 201, message: 'tasks were successfully added' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that updates a Task details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} string contains Task group id to which the details needs to be updated
   * @param    {TaskId} string contains Task group id to which the details needs to be updated
   * @param    {editTaskDto} EditTaskDto contains Task  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTaskDetails(
    user: string,
    TaskGroupId: string,
    TaskId: string,
    editTaskDto: EditTaskDto,
  ) {
    const TaskData = await this.taskGroupModel.findOne({
      _id: TaskGroupId,
    });
    let updateObject;
    if (!TaskData) throw new NotFoundException();

    // remove the Task the needs to be changed
    const Tasks = [];
    TaskData.Tasks.map(Task => {
      if (Task.taskId !== TaskId) {
        Tasks.push(Task);
      } else {
        updateObject = Task;
      }
    });
    // change the details and push it back
    console.log(updateObject);
    Tasks.push({
      taskId: updateObject.taskId,
      taskName: editTaskDto.taskName,
      taskDescription: editTaskDto.taskDescription,
      tasksStatus: updateObject.tasksStatus,
    });
    // put it back in the object and save it
    TaskData.Tasks = Tasks;
    try {
      TaskData.save();
      return { statusCode: 201, message: 'Task was successfully updated' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that updates a Task details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} string contains Task group id to which the details needs to be updated
   * @param    {TaskId} string contains Task group id to which the details needs to be updated
   * @param    {editTaskDto} EditTaskDto contains Task  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTaskDone(user: string, TaskGroupId: string, TaskId: string) {
    const TaskData = await this.taskGroupModel.findOne({
      _id: TaskGroupId,
    });
    let updateObject;
    if (!TaskData) throw new NotFoundException();

    // remove the Task the needs to be changed
    const Tasks = [];
    TaskData.Tasks.map(Task => {
      if (Task.taskId !== TaskId) {
        Tasks.push(Task);
      } else {
        if (Task.tasksStatus === 'DONE')
          throw new BadRequestException('task is already done');
        updateObject = Task;
      }
    });
    // change the details and push it back
    Tasks.push({
      taskId: updateObject.taskId,
      taskName: updateObject.taskName,
      taskDescription: updateObject.taskDescription,
      tasksStatus: 'DONE',
    });
    // put it back in the object and save it
    TaskData.Tasks = Tasks;
    try {
      TaskData.save();
      return { statusCode: 201, message: 'Task was successfully updated' };
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
    const taskData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!taskData) throw new NotFoundException();
    if (taskData.user === user) throw new UnauthorizedException();
    taskData.groupName = updateTaskDetailsDto.groupName;
    taskData.groupDescription = updateTaskDetailsDto.groupDescription;
    try {
      taskData.save();
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
    const taskData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!taskData) throw new NotFoundException();
    if (taskData.user === user) throw new UnauthorizedException();
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
    const taskData = await this.taskGroupModel.findOne({ _id: taskGroupId });
    if (!taskData) throw new NotFoundException();
    if (taskData.user === user) throw new UnauthorizedException();
    const Alltasks = taskData.Tasks;
    const filteredTasks = Alltasks.filter(task => {
      return task.taskId !== taskId;
    });
    taskData.Tasks = filteredTasks;
    try {
      taskData.save();
      return { statusCode: 200, message: 'taskgroup deleted successfully' };
    } catch (error) {
      return error;
    }
  }

  /**
   * Function that delete a tasks group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {tasksGroupIds} Array<string> contains tasks group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipletasksGroups(tasksGroupIds: string[]) {
    // checking and sending error if any groups isnt present
    try {
      const tasksGroup = await this.taskGroupModel.find({
        _id: tasksGroupIds,
      });
    } catch (error) {
      return error;
    }

    // deleting all the group
    try {
      await this.taskGroupModel.deleteMany({ _id: tasksGroupIds });
    } catch (error) {
      return error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'tasks groups deleted successfully',
    };
  }

  /**
   * Function that delete all the taskss id that are mentioned
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {tasksGroupId} string contains tasks group ids that needs to be deleted
   * @param    {tasksIds} Array<string> contains tasks group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipletasks(tasksGroupId: string, tasksIds: string[]) {
    const tasksGroup = await this.taskGroupModel.findOne({
      _id: tasksGroupId,
    });
    const filteredtasks = tasksGroup.Tasks.filter(tasks => {
      return !tasksIds.includes(tasks.taskId);
    });
    tasksGroup.Tasks = filteredtasks;
    try {
      tasksGroup.save();
      return {
        statusCode: 200,
        message: 'tasks group deleted successfully',
      };
    } catch (error) {
      return error;
    }
  }
}
