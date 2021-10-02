import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { RemainderRepository } from '../repositories/remainder.repository';

@Injectable()
export class NotifyRemainderService {
  constructor(private readonly remainderRepository: RemainderRepository) {}

  @Cron('60 * * * * *')
  async handleCron() {
    console.log(
      'cron is running:',
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString(),
    );

    // time range to query remainders
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 30000);
    const pastDate = new Date(currentDate.getTime() - 30000);

    // getting the remainders on the basis of range i.e 1 minute
    const res = await this.remainderRepository.find({
      remainderDate: { $lt: futureDate, $gt: pastDate },
    });

    res.forEach(object => {
      if (object) {
        console.log(JSON.stringify(res));
        console.log(
          object.remainderDate.toLocaleDateString(),
          object.remainderDate.toLocaleTimeString(),
        );
      }
    });
    if (res.length === 0) console.log('NO REMAINDERS');
  }
}
