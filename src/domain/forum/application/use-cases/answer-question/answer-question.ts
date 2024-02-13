import { right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Answer } from "@forum-entities/answer";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	AnswerQuestionUseCaseProps,
	AnswerQuestionUseCaseResponse,
} from "./answer-question.types";

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseProps): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		await this.answersRepository.create(answer);

		return right({ answer });
	}
}
