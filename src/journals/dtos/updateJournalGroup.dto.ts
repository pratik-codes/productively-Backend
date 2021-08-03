import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class UpdateJournalDetailsDto {
  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsNotEmpty()
  @IsString()
  groupDescription: string;
}
