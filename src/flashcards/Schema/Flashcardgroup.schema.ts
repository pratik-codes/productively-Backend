import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
import { Flashcard } from './Flashcard.schema';
export type FlashcardGroupDocument = FlashcardGroup & Document;

@Schema()
export class FlashcardGroup {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  user: string;

  @Prop()
  @IsNotEmpty()
  groupName: string;

  @Prop()
  @IsNotEmpty()
  groupDescription: string;

  @Prop()
  @IsNotEmpty()
  Flashcards: Flashcard[];
}

export const FlashcardGroupSchema = SchemaFactory.createForClass(
  FlashcardGroup,
);
