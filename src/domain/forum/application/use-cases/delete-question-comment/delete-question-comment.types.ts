import { Either } from "@core/either";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type DeleteQuestionCommentUseCaseProps = {
	authorId: string;
	questionCommentId: string;
};

export type DeleteQuestionCommentUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
