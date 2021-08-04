import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class AddFlashCardDto {
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
