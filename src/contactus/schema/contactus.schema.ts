import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
export type ContactUsDocument = ContactUs & Document;

@Schema()
export class ContactUs {
  @Prop()
  @IsNotEmpty()
  userId: string;

  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ length: 500 })
  @IsNotEmpty()
  message: string;

  @Prop()
  @IsNotEmpty()
  createdAt: Date = new Date();
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
