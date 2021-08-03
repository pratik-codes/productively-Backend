import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Journal {
  @Prop()
  @IsNotEmpty()
  journalId: string;

  @Prop()
  @IsNotEmpty()
  journalName: string;

  @Prop()
  journalDescription: string;

  @Prop()
  @IsNotEmpty()
  journalDate: Date;

  @Prop()
  ans1: string;

  @Prop()
  ans2: string;

  @Prop()
  ans3: string;

  @Prop()
  ans4: string;
}

export const UserSchema = SchemaFactory.createForClass(Journal);
