import { AnswersRepository } from "@forum-repositories/answers-repository";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { ChooseQuestionBestAnswerUseCaseProps } from "./choose-question-best-answer.types";

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository,
	) {}

	async execute({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseProps): Promise<void> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer nof found.");
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);

		if (!question) {
			throw new Error("Question nof found.");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.save(question);
	}
}
