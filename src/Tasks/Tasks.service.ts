import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EditTaskDto } from './Dtos/editTask.dto';
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
   * Function that updates a Task details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} string contains Task group id to which the details needs to be updated
   * @param    {TaskId} string contains Task group id to which the details needs to be updated
   * @param    {editTaskDto} EditTaskDto contains Task  details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async editTaskDetails(
    user: string,
    TaskGroupId: string,
    TaskId: string,
    editTaskDto: EditTaskDto,
  ) {
    return await this.taskGroupRepository.updateTaskDetails(
      user,
      TaskGroupId,
      TaskId,
      editTaskDto,
    );
  }

  /**
   * Function that updates a Task to done status
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} string contains Task group id to which the details needs to be updated
   * @param    {TaskId} string contains Task group id to which the details needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  async updateTaskDone(user: string, TaskGroupId: string, TaskId: string) {
    return await this.taskGroupRepository.updateTaskDone(
      user,
      TaskGroupId,
      TaskId,
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

  /**
   * Function that delete a tasks group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {tasksGroupIds} Array<string> contains tasks group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipleTasksGroups(tasksGroupIds: string[]) {
    return await this.taskGroupRepository.deleteMultipletasksGroups(
      tasksGroupIds,
    );
  }

  /**
   * Function that delete all the taskss id that are mentioned
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {tasksGroupId} string contains tasks group ids that needs to be deleted
   * @param    {tasksIds} Array<string> contains tasks group ids that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  async deleteMultipleTasks(tasksGroupId: string, tasksIds: string[]) {
    return await this.taskGroupRepository.deleteMultipletasks(
      tasksGroupId,
      tasksIds,
    );
  }
}
