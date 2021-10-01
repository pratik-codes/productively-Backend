import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { NotifyRemainderRepository } from '../repositories/notifyRemainder.repository';

@Injectable()
export class NotifyRemainderService {
  constructor(
    private readonly notifyRemainderRepository: NotifyRemainderRepository,
  ) {}

  @Cron('60 * * * * *')
  async handleCron() {
    console.log('cron is running');
    const res = await this.notifyRemainderRepository.findAll({
      remainderDate: new Date(),
    });
    console.log(res);
  }
}
