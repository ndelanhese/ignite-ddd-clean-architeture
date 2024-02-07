import { Answer } from "@entities/answer";
import { AnswersRepository } from "@repositories/answers-repository";
import { AnswerQuestionUseCaseProps } from "./answer-question.types";

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseProps) {
		const answer = new Answer({
			content,
			authorId: instructorId,
			questionId,
		});

		await this.answersRepository.create(answer);

		return answer;
	}
}
