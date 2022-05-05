import express from 'express';

import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCase';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailAdpter } from './adapters/nodemailer/nodemailerMailAdpter';


export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdpter = new NodemailerMailAdpter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdpter,
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })




  return res.status(201).send()
})
