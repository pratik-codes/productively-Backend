import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class EditFlashcardDto {
  @IsNotEmpty()
  @IsString()
  flashcardName: string;

  @IsString()
  flashcardDescription: string;
}
