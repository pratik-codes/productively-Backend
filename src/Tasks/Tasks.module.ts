import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { TasksController } from './Tasks.controller';
import { TasksService } from './Tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskGroup, TaskGroupSchema } from './schemas/Taskgroups.schema';
import { TaskGroupRepository } from './Tasks.repository';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: TaskGroup.name, schema: TaskGroupSchema },
    ]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskGroupRepository],
})
export class TasksModule {}
