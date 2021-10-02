import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { EmailerController } from './emailer.controller';
import { EmailerService } from './emailer.service';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        // Through Gmail services (remember to disbale secure apps in settings)
        service: 'gmail',
        port: 465,
        secure: false,
        auth: {
          type: 'OAuth2',
          user: 'noreply.productively@gmail.com',
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: process.env.OAUTH_ACCESS_TOKEN,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
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
