import { QuestionCommentsRepository } from "@forum-repositories/question-comments-repository";
import { DeleteQuestionCommentUseCaseProps } from "./delete-question-comment.types";

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute({
		authorId,
		questionCommentId,
	}: DeleteQuestionCommentUseCaseProps): Promise<void> {
		const questionComment =
			await this.questionCommentsRepository.findById(questionCommentId);

		if (!questionComment) {
			throw new Error("Question comment not found.");
		}

		if (authorId !== questionComment.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		await this.questionCommentsRepository.delete(questionComment);
	}
}
