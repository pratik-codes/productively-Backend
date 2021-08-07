import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
export type PriorityDocument = Priority & Document;

@Schema()
export class Priority {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  user: string;

  @Prop()
  @IsNotEmpty()
  priority: string;
}
export const PrioritySchema = SchemaFactory.createForClass(Priority);
