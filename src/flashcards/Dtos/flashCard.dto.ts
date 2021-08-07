import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class FlashcardDto {
  @IsNotEmpty()
  @IsString()
  flashcardName: string;

  @IsNotEmpty()
  @IsString()
  flashcardDescription: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
