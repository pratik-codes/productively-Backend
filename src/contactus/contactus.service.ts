import { Injectable } from '@nestjs/common';
import { Date } from 'mongoose';
import { ContactUsRepository } from './contactus.repository';
import { ContactUsDto } from './dto/contactus.dto';

@Injectable()
export class ContactusService {
  constructor(private readonly contactUsRepository: ContactUsRepository) {}

  async saveContactUsResponse(contactUsDto: ContactUsDto, userId: string) {
    const { email, name, message } = contactUsDto;

    const today = new Date();
    const contactUsData = {
      userId: userId,
      name: name,
      email: email,
      message: message,
      createdAt: today,
    };

    return await this.contactUsRepository.create(contactUsData);
  }
}
