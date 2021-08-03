import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
import { Journal } from './Journal.schema';
export type JournalGroupDocument = JournalGroup & Document;

@Schema()
export class JournalGroup {
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
  Journals: Journal[];
}

export const JournalGroupSchema = SchemaFactory.createForClass(JournalGroup);
