import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JournalsController } from './journals.controller';
import { journalGroupRepository } from './journals.repository';
import { JournalsService } from './journals.service';
import { JournalGroup, JournalGroupSchema } from './Schema/Journalgroup.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: JournalGroup.name, schema: JournalGroupSchema },
    ]),
    UsersModule,
  ],
  controllers: [JournalsController],
  providers: [JournalsService, journalGroupRepository],
})
export class JournalsModule {}
