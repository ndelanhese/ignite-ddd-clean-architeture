import { left, right } from "@core/either";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";
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
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);

		return right({
			question,
		});
	}
}
