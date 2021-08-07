import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TaskGroupDto } from './Dtos/TaskGroup-dto';
import { UpdateTaskDetailsDto } from './Dtos/updateTaskDetails.dto';
import { UpdateTasksTaskDto } from './Dtos/updateTasksTaskGroup.dto';
import { TaskGroupRepository } from './Tasks.repository';
@Injectable()
export class TasksService {
  constructor(private readonly taskGroupRepository: TaskGroupRepository) {}

  /**
   * Function that returns all the task groups of a user
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @return   {TaskGroup} returns all the task group of the user
   */
  async getTaskGroup(user: string) {
    const taskGroups: any = await this.taskGroupRepository.find({ user });
    const responseTaskGroups = [];
    taskGroups.map(taskGroup => {
      const doneTasks = [];
      const pendingTasks = [];
      taskGroup.Tasks.map(task => {
        if (task.tasksStatus === 'PENDING') {
          pendingTasks.push(task);
        } else {
          doneTasks.push(task);
        }
      });
      const TaskGroupObj = {
        taskGroupId: taskGroup._id,
        taskGroupName: taskGroup.groupName,
        taskGroupDescription: taskGroup.groupDescription,
        tasks: { Pending: pendingTasks, done: doneTasks },
      };
      responseTaskGroups.push(TaskGroupObj);
    });
    return { statusCode: 200, data: responseTaskGroups };
  }

  /**
   * Function that creates a new task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupDto} TaskGroupDto contains data of the task group that is to be created
   * @return   {BasicResponse} statusCode and messages
   */
  async createTask(user: string, taskGroupDto: TaskGroupDto) {
    console.log(taskGroupDto);

    return await this.taskGroupRepository.create(user, taskGroupDto);
  }

  /**
   * Function that update a task group details
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that needs to be updated
   * @param    {updateTaskDetailsDto} UpdateTaskDetailsDto contains data of the task group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTaskGroupDetails(
    user: string,
    taskGroupId: string,
    updateTaskDetailsDto: UpdateTaskDetailsDto,
  ) {
    return await this.taskGroupRepository.updateTasksGroupDetails(
      user,
      taskGroupId,
      updateTaskDetailsDto,
    );
  }

  /**
   * Function that updates a tasks inside a task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that needs to be updated
   * @param    {updateTasksTaskDto} UpdateTasksTaskDto contains data of the task of the task group that is to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTasksInTaskGroup(
    user: string,
    taskGroupId: string,
    updateTasksTaskDto: UpdateTasksTaskDto,
  ) {
    const TasksData = {
      taskId: uuidv4(),
      taskName: updateTasksTaskDto.Tasks.taskName,
      taskDescription: updateTasksTaskDto.Tasks.taskDescription,
      tasksStatus: updateTasksTaskDto.Tasks.tasksStatus,
    };
    return await this.taskGroupRepository.updateTasksInTasksGroup(
      user,
      taskGroupId,
      TasksData,
    );
  }

  /**
   * Function that deletes  a task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteTaskGroup(user: string, taskGroupId: string) {
    return await this.taskGroupRepository.deleteTaskGroup(user, taskGroupId);
  }

  /**
   * Function that delete a task of a task group
   * @author   Pratik Tiwari
   * @param    {user} userId contains object id of the user
   * @param    {taskGroupId} string contains id of the task group that has the task
   * @param    {taskId} string contains id of the task group that contains the task that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteTask(user: string, taskGroupId: string, taskId: string) {
    return await this.taskGroupRepository.deleteTask(user, taskGroupId, taskId);
  }
}
