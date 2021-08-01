import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';
import { TaskDto } from './task.dto';

export class TaskGroupDto {
  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsNotEmpty()
  @IsString()
  groupDescription: string;
}
