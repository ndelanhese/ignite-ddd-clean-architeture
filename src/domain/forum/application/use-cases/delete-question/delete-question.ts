import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { DeleteQuestionUseCaseProps } from "./delete-question.types";

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		questionId,
	}: DeleteQuestionUseCaseProps): Promise<void> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question nof found.");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		await this.questionsRepository.delete(question);
	}
}
