import { left, right } from "@core/either";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";
import {
	DeleteQuestionUseCaseProps,
	DeleteQuestionUseCaseResponse,
} from "./delete-question.types";

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		questionId,
	}: DeleteQuestionUseCaseProps): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return right(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.questionsRepository.delete(question);

		return right({});
	}
}
