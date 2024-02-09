import { QuestionsRepository } from "@forum-repositories/questions-repository";
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
			throw new Error("Question not found.");
		}

		return { question };
	}
}
