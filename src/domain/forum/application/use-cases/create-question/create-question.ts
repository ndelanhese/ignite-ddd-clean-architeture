import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	CreateQuestionUseCaseProps,
	CreateQuestionUseCaseResponse,
} from "./create-question.types";

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		content,
		title,
	}: CreateQuestionUseCaseProps): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		});

		await this.questionsRepository.create(question);

		return { question };
	}
}
