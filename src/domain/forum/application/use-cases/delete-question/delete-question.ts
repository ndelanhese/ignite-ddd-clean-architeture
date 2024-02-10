import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { DeleteQuestionUseCaseProps } from "./delete-question.types";

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({ questionId }: DeleteQuestionUseCaseProps): Promise<void> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question nof found.");
		}

		await this.questionsRepository.delete(question);
	}
}
