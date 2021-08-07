import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Flashcard {
  @Prop()
  flashcardId: string;

  @Prop()
  flashcardName: string;

  @Prop()
  flashcardDescription: string;

  @Prop()
  data: string;
}

export const FlashCardSchema = SchemaFactory.createForClass(Flashcard);
