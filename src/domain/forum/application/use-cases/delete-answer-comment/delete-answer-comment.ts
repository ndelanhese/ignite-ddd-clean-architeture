import { left, right } from "@core/either";
import { AnswerCommentsRepository } from "@forum-repositories/answer-comments-repository";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";
import {
	DeleteAnswerCommentUseCaseProps,
	DeleteAnswerCommentUseCaseResponse,
} from "./delete-answer-comment.types";

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		authorId,
		answerCommentId,
	}: DeleteAnswerCommentUseCaseProps): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment =
			await this.answerCommentsRepository.findById(answerCommentId);

		if (!answerComment) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answerComment.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.answerCommentsRepository.delete(answerComment);

		return right({});
	}
}
