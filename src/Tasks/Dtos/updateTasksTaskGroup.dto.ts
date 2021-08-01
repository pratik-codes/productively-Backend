import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';
import { Task, TaskStatusEnum } from '../schemas/Task.schema';
import { TaskDto } from './task.dto';

export class UpdateTasksTaskDto {
  @IsNotEmpty()
  Tasks: Task;
}
