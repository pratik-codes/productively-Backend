import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class UpdateFlashcardDetailsDto {
  @IsNotEmpty()
  groupName: string;

  @IsNotEmpty()
  groupDescription: string;
}
