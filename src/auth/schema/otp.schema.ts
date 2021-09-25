import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Validate,
} from 'class-validator';
export type OtpDocument = Otp & Document;

export enum OtpAuthTypeEnum {
  FORGOT_PASSWORD,
}

@Schema()
export class Otp {
  @Prop()
  @IsNotEmpty()
  otp: number;

  @Prop()
  @IsNotEmpty()
  userId: string;

  @Prop()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  createdAt: Date;

  @Prop()
  @IsEnum(OtpAuthTypeEnum)
  authType: string;

  @Prop()
  @IsNotEmpty()
  valid: boolean;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
