import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  message: string;
}
