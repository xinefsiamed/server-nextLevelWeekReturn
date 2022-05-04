import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';


const app = express();

app.use(express.json());


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "33bcc6b719f583",
    pass: "f2cd2cc43fc094"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Leonardo Augusto <leonardoaugusto.soliveira@email.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<p>Tipo de Feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen('3333', () => {
  console.log('HTTP server running on port 3333')
})