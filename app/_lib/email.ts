import { Resend} from 'resend';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

export default class Email {
  constructor(private to: string) {}
  
  sendMail() {
    const templateString = readFileSync(
      path.join(process.cwd(), 'app', '_lib', 'templates', 'notification.html'),
      { encoding: 'utf-8' },
    );
    const templateCompile = Handlebars.compile(templateString);
    const source = templateCompile({
      name: this.to,
      dashboardUrl: 'http://localhost:3000/order',
    });
    const mailOptions = {
      from: 'gaurangtyagi@gaurang.work',
      to: this.to,
      subject: 'Order your medicines',
      html: source,
    };
    const send = new Resend(process.env.RESEND_KEY || "");
    send.emails.send(mailOptions);
    
  }
}
