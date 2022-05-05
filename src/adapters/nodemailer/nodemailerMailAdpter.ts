import nodemailer from 'nodemailer';
import { MailAdpter, SendMailData } from "../mailAdpter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "33bcc6b719f583",
    pass: "f2cd2cc43fc094"
  }
});

export class NodemailerMailAdpter implements MailAdpter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Leonardo Augusto <leonardoaugusto.soliveira@email.com>',
      subject,
      html: body,
    })

  }
}