import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export enum TaskStatusEnum {
  DONE = 'DONE',
  PENDING = 'PENDING',
}

@Schema()
export class Task {
  @Prop()
  taskId: string;

  @Prop()
  taskName: string;

  @Prop()
  taskDescription: string;

  @Prop()
  tasksStatus: TaskStatusEnum;
}

export const UserSchema = SchemaFactory.createForClass(Task);
