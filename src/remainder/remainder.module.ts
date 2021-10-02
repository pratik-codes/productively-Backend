import { Module } from '@nestjs/common';
import { RemainderService } from './services/remainder.service';
import { RemainderController } from './remainder.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Remainder, RemainderSchema } from './Schema/remainder.schema';
import { RemainderRepository } from './repositories/remainder.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { NotifyRemainderService } from './services/notifyRemainder.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: Remainder.name, schema: RemainderSchema },
    ]),
  ],
  providers: [RemainderService, RemainderRepository, NotifyRemainderService],
  controllers: [RemainderController],
})
export class RemainderModule {}
