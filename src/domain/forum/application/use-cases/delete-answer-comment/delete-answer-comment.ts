import { AnswerCommentsRepository } from "@forum-repositories/answer-comments-repository";
import { DeleteAnswerCommentUseCaseProps } from "./delete-answer-comment.types";

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		authorId,
		answerCommentId,
	}: DeleteAnswerCommentUseCaseProps): Promise<void> {
		const answerComment =
			await this.answerCommentsRepository.findById(answerCommentId);

		if (!answerComment) {
			throw new Error("Answer comment not found.");
		}

		if (authorId !== answerComment.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		await this.answerCommentsRepository.delete(answerComment);
	}
}
