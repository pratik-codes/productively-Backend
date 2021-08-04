import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'nestjs-dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './Tasks/Tasks.module';
import { JournalsModule } from './journals/journals.module';
import { FlashcardsModule } from './flashcards/flashcards.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://Admin:Admin@productively.snxdm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    TasksModule,
    JournalsModule,
    FlashcardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
