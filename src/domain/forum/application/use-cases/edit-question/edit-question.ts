import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	EditQuestionUseCaseProps,
	EditQuestionUseCaseResponse,
} from "./edit-question.types";

export class EditQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		questionId,
		content,
		title,
	}: EditQuestionUseCaseProps): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question nof found.");
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);

		return {
			question,
		};
	}
}
