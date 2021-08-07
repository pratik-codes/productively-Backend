import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class FlashcardGroupDto {
  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsString()
  groupDescription: string;
}
