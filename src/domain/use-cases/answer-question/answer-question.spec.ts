import { Answer } from "@entities/answer";
import { AnswersRepository } from "@repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

describe("Answer Question", () => {
	const fakeAnswersRepository: AnswersRepository = {
		create: async (_: Answer) => {
			return;
		},
	};

	it("should be able to create an answer", async () => {
		const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

		const answer = await answerQuestion.execute({
			questionId: "1",
			instructorId: "1",
			content: "New answer",
		});

		expect(answer.content).toEqual("New answer");
	});
});
