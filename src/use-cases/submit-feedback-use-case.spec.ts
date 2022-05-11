import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:"Example Comment",
            screenshot:"data:image/png;base64,848d4d84fd84g8f4gf"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type:'',
            comment:"Example Comment",
            screenshot:"data:image/png;base64,848d4d84fd84g8f4gf"
        })).rejects.toThrow();
    })
    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:"",
            screenshot:"data:image/png;base64,848d4d84fd84g8f4gf"
        })).rejects.toThrow();
    })
    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:"Example Comment",
            screenshot:"teste.jpg"
        })).rejects.toThrow();
    })
})