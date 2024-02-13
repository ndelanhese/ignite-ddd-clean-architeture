import { Either } from "@core/either";
import { QuestionComment } from "@forum-entities/question-comment";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type CommentOnQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
	content: string;
};

export type CommentOnQuestionUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		questionComment: QuestionComment;
	}
>;
