import { Module } from '@nestjs/common';
import { RemainderService } from './services/remainder.service';
import { RemainderController } from './remainder.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Remainder, RemainderSchema } from './Schema/remainder.schema';
import { RemainderRepository } from './repositories/remainder.repository';
import {
  NotifyRemainder,
  NotifyRemainderSchema,
} from './Schema/notifyRemainder.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { NotifyRemainderService } from './services/notifyRemainder.service';
import { NotifyRemainderRepository } from './repositories/notifyRemainder.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: Remainder.name, schema: RemainderSchema },
      { name: NotifyRemainder.name, schema: NotifyRemainderSchema },
    ]),
  ],
  providers: [
    RemainderService,
    RemainderRepository,
    NotifyRemainderService,
    NotifyRemainderRepository,
  ],
  controllers: [RemainderController],
})
export class RemainderModule {}
