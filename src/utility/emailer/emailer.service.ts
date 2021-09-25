import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailerService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmail(email: string): void {
    //function to send simple message

    this.mailerService
      .sendMail({
        to: `${email}`, // List of receivers email address
        from: 'pratik2018id@gmail.com', // Senders email address
        subject: 'test', // Subject line
        text: 'test email', // plaintext body
        html: `<a>test email</a>`, // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
