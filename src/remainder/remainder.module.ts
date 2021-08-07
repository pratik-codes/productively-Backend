import { Module } from '@nestjs/common';
import { RemainderService } from './remainder.service';
import { RemainderController } from './remainder.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Remainder, RemainderSchema } from './Schema/remainder.schema';
import { RemainderRepository } from './remainder.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: Remainder.name, schema: RemainderSchema },
    ]),
  ],
  providers: [RemainderService, RemainderRepository],
  controllers: [RemainderController],
})
export class RemainderModule {}
