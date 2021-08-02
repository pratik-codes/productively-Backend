import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class JournalDto {
  @IsNotEmpty()
  @IsString()
  journalName: string;

  @IsString()
  journalDescription: string;

  @IsNotEmpty()
  @IsDate()
  journalDate: Date;

  @IsString()
  ans1: string;

  @IsString()
  ans2: string;

  @IsString()
  ans3: string;

  @IsString()
  ans4: string;
}
