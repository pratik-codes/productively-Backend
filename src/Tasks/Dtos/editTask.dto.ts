import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';
import { TaskStatusEnum } from '../schemas/Task.schema';

export class EditTaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsEnum(TaskStatusEnum)
  tasksStatus: string;
}
