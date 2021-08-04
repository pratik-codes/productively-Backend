import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardGroupRepository } from './flashcards.repository';
import { FlashcardsService } from './flashcards.service';
import { Flashcard, FlashCardSchema } from './Schema/Flashcard.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: Flashcard.name, schema: FlashCardSchema },
    ]),
  ],
  controllers: [FlashcardsController],
  providers: [FlashcardsService, FlashcardGroupRepository],
})
export class FlashcardsModule {}
