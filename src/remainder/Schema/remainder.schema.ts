import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
export type RemainderDocument = Remainder & Document;

@Schema()
export class Remainder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  user: string;

  @Prop()
  @IsNotEmpty()
  remainderName: string;

  @Prop()
  @IsNotEmpty()
  remainderDescription: string;

  @Prop()
  remainderDate: Date;
}
export const RemainderSchema = SchemaFactory.createForClass(Remainder);
