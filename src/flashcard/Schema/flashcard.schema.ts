import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
export type FlashcardDocument = Flashcard & Document;

@Schema()
export class Flashcard {
  @Prop()
  @IsNotEmpty()
  flashcardId: string;

  @Prop()
  @IsNotEmpty()
  flashcardName: string;

  @Prop()
  @IsNotEmpty()
  flashcardDescription: string;

  @Prop()
  @IsNotEmpty()
  data: string;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
