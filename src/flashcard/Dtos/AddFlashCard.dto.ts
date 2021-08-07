import {
  IsArray,
  isDate,
  IsDate,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class AddFlashCardDto {
  @IsNotEmpty()
  @IsString()
  flashcardName: string;

  @IsString()
  flashcardDescription: string;

  @IsDate()
  data: string;
}
