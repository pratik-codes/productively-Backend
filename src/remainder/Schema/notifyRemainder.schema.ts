import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export type NotifyRemainderDocument = NotifyRemainder & Document;

@Schema()
export class NotifyRemainder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  userId: string;

  @Prop()
  @IsNotEmpty()
  remainderName: string;

  @Prop()
  @IsNotEmpty()
  remainderDescription: string;

  @Prop()
  remainderDate: Date;
}
export const NotifyRemainderSchema = SchemaFactory.createForClass(
  NotifyRemainder,
);
