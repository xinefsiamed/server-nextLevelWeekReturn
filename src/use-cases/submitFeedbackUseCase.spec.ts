import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedBack = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)


describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedBack.execute({
      type: "BUG",
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0Kasdfasdfasdfasdf',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {

    await expect(submitFeedBack.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0Kasdfasdfasdfasdf',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {

    await expect(submitFeedBack.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,iVBORw0Kasdfasdfasdfasdf',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {

    await expect(submitFeedBack.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});