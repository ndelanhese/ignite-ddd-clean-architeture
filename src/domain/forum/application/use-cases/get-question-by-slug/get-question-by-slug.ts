import { left, right } from "@core/either";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";
import {
	GetQuestionBySlugUseCaseProps,
	GetQuestionBySlugUseCaseResponse,
} from "./get-question-by-slug.types";

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseProps): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({ question });
	}
}
