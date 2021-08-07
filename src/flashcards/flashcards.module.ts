import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardGroupRepository } from './flashcards.repository';
import { FlashcardsService } from './flashcards.service';
import { Flashcard, FlashCardSchema } from './Schema/Flashcard.schema';
import { FlashcardGroup } from './Schema/Flashcardgroup.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: FlashcardGroup.name, schema: FlashCardSchema },
    ]),
  ],
  controllers: [FlashcardsController],
  providers: [FlashcardsService, FlashcardGroupRepository],
})
export class FlashcardsModule {}
