import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './Tasks/Tasks.module';
import { JournalsModule } from './journals/journals.module';
import { RemainderModule } from './remainder/remainder.module';
import { PriorityModule } from './priority/priority.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { ContactusModule } from './contactus/contactus.module';
import { EmailerModule } from './utility/emailer/emailer.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI.toString()),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    TasksModule,
    JournalsModule,
    RemainderModule,
    PriorityModule,
    FlashcardModule,
    ContactusModule,
    EmailerModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
