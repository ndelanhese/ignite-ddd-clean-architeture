import { QuestionsRepository } from "@forum-repositories/questions-repository";
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
			throw new Error("Question not found.");
		}

		return { question };
	}
}
