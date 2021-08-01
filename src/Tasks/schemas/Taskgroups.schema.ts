import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
import { Task } from './Task.schema';
export type TaskGroupDocument = TaskGroup & Document;

@Schema()
export class TaskGroup {
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
  Tasks: Task[];
}

export const TaskGroupSchema = SchemaFactory.createForClass(TaskGroup);
