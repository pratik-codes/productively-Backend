import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class CreateRemainderDto {
  @IsNotEmpty()
  @IsString()
  remainderName: string;

  @IsNotEmpty()
  @IsString()
  remainderDescription: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}
