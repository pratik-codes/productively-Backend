import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactusController } from './contactus.controller';
import { ContactUsRepository } from './contactus.repository';
import { ContactusService } from './contactus.service';
import { ContactUs, ContactUsSchema } from './schema/contactus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactUs.name, schema: ContactUsSchema },
    ]),
  ],
  controllers: [ContactusController],
  providers: [ContactusService, ContactUsRepository],
})
export class ContactusModule {}
