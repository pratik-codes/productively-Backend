import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailerController } from './emailer.controller';
import { EmailerService } from './emailer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        // Through Gmail services (remember to disbale secure apps in settings)
        service: 'gmail',
        auth: {
          user: 'noreply.productively@gmail.com',
          pass: process.env.Mailer_Account_Password,
        },
      },
      template: {
        dir: process.cwd() + '/src/utility/emailer/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailerController],
  providers: [EmailerService],
  exports: [EmailerService],
})
export class EmailerModule {}
