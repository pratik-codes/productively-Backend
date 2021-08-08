import { Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskGroupDto } from './Dtos/TaskGroup-dto';
import { UpdateTaskDetailsDto } from './Dtos/updateTaskDetails.dto';
import { UpdateTasksTaskDto } from './Dtos/updateTasksTaskGroup.dto';
import { TasksService } from './Tasks.service';

@Controller('taskgroup')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Function that return users all task groups
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @return   {TaskGroup} List of task groups of the user
   */
  @Get('')
  async getTaskGroup(@Req() req) {
    return await this.tasksService.getTaskGroup(req.user._id);
  }

  /**
   * Function that creates a new task group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {taskGroupDto} TaskGroupDto contains task group data
   * @return   {BasicResponse} statusCode and messages
   */
  @Post('')
  async createTaskGroup(@Req() req, @Body() taskGroupDto: TaskGroupDto) {
    console.log(taskGroupDto);
    return await this.tasksService.createTask(req.user._id, taskGroupDto);
  }

  /**
   * Function that updates a task group details
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} TaskGroupId contains task group id to which the details needs to be updated
   * @param    {updateTaskDetailsDto} UpdateTaskDetailsDto contains task group details that needs to be updated
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('')
  async updateTaskGroup(
    @Req() req,
    @Body('TaskGroupId') TaskGroupId: string,
    @Body() updateTaskDetailsDto: UpdateTaskDetailsDto,
  ) {
    return await this.tasksService.updateTaskGroupDetails(
      req.user._id,
      TaskGroupId,
      updateTaskDetailsDto,
    );
  }

  /**
   * Function that creates a new task inside a task group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} TaskGroupId contains task group id to which the task is added to
   * @param    {updateTasksTaskDto} UpdateTasksTaskDto contains task data that needs to be added
   * @return   {BasicResponse} statusCode and messages
   */
  @Patch('tasks')
  async uodateTasksInTaskGroup(
    @Req() req,
    @Body('TaskGroupId') TaskGroupId: string,
    @Body() updateTasksTaskDto: UpdateTasksTaskDto,
  ) {
    return await this.tasksService.updateTasksInTaskGroup(
      req.user._id,
      TaskGroupId,
      updateTasksTaskDto,
    );
  }

  /**
   * Function that delete a task group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} TaskGroupId contains task group id that needs to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/:TaskGroupId')
  async deletetaskGroup(@Req() req, @Param('TaskGroupId') TaskGroupId: string) {
    return await this.tasksService.deleteTaskGroup(req.user._id, TaskGroupId);
  }

  /**
   * Function that delete a task group
   * @author   Pratik Tiwari
   * @param    {Req} request the http request by the clients
   * @param    {TaskGroupId} TaskGroupId contains task group id to in which the task exists
   * @param    {TaskId} TaskGroupId contains task id which is to be deleted
   * @return   {BasicResponse} statusCode and messages
   */
  @Delete('/task/:TaskGroupId/:TaskId')
  async deletetasksInTaskGroup(
    @Req() req,
    @Param('TaskGroupId') TaskGroupId: string,
    @Param('TaskId') TaskId: string,
  ) {
    console.log(TaskId);
    return await this.tasksService.deleteTask(
      req.user._id,
      TaskGroupId,
      TaskId,
    );
  }
}
