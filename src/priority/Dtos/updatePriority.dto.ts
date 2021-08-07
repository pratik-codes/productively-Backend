import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class UpdatePriorityDto {
  @IsNotEmpty()
  @IsString()
  priorityId: string;

  @IsNotEmpty()
  @IsString()
  priority: string;
}
