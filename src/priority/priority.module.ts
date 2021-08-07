import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { PriorityController } from './priority.controller';
import { PriorityRepository } from './Priority.repository';
import { PriorityService } from './priority.service';
import { Priority, PrioritySchema } from './Schema/priority.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: Priority.name, schema: PrioritySchema },
    ]),
  ],
  controllers: [PriorityController],
  providers: [PriorityService, PriorityRepository],
})
export class PriorityModule {}
