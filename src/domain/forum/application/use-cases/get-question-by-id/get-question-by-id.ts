import { left, right } from "@core/either";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";
import {
	GetQuestionByIdUseCaseProps,
	GetQuestionByIdUseCaseResponse,
} from "./get-question-by-id.types";

export class GetQuestionByIdUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		id,
	}: GetQuestionByIdUseCaseProps): Promise<GetQuestionByIdUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({ question });
	}
}
