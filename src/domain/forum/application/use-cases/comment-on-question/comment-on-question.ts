import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionComment } from "@forum-entities/question-comments";
import { QuestionCommentsRepository } from "@forum-repositories/question-comments-repository";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	CommentOnQuestionUseCaseProps,
	CommentOnQuestionUseCaseResponse,
} from "./comment-on-question.types";

export class CommentOnQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionCommentsRepository: QuestionCommentsRepository,
	) {}

	async execute({
		authorId,
		questionId,
		content,
	}: CommentOnQuestionUseCaseProps): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error("Question not found.");
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			content,
			questionId: new UniqueEntityId(questionId),
		});

		await this.questionCommentsRepository.create(questionComment);

		return { questionComment };
	}
}
