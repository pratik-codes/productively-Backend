import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

import { EmailerController } from './emailer.controller';
import { EmailerService } from './emailer.service';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        // Through Gmail services (remember to disbale secure apps in settings)
        service: 'gmail',
        port: 587,
        secure: false,
        ignoreTLS: true,
        auth: {
          user: 'contact.productively@gmail.com',
          pass: process.env.Mailer_Account_Password,
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
export class EmailerModule {
  constructor() {
    // this.getAccessToken();
  }

  getAccessToken = async () => {
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground', // Redirect URL
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });
    const accessToken = await oauth2Client.getAccessToken();
    console.log(accessToken);
  };
}
