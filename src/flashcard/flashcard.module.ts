import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { FlashcardController } from './flashcard.controller';
import { FlashcardGroupRepository } from './flashcard.repository';
import { FlashcardService } from './flashcard.service';
import {
  FlashcardGroup,
  FlashcardGroupSchema,
} from './Schema/flashcardgroup.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: FlashcardGroup.name, schema: FlashcardGroupSchema },
    ]),
  ],
  controllers: [FlashcardController],
  providers: [FlashcardService, FlashcardGroupRepository],
})
export class FlashcardModule {}
