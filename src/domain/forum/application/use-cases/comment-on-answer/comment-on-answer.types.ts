import { Either } from "@core/either";
import { AnswerComment } from "@forum-entities/answer-comment";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type CommentOnAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
	content: string;
};

export type CommentOnAnswerUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		answerComment: AnswerComment;
	}
>;
