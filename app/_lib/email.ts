import { createTransport, Transporter } from 'nodemailer';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

export default class Email {
  constructor(private to: string) {}
  newTransporter(): Transporter {
    return createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
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
    this.newTransporter().sendMail(mailOptions, (err) => {
      console.log(err?.message);
    });
  }
}
