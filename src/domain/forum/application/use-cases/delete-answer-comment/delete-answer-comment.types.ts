import { Either } from "@core/either";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "../../use-case-error/resource-not-found-error";

export type DeleteAnswerCommentUseCaseProps = {
	authorId: string;
	answerCommentId: string;
};

export type DeleteAnswerCommentUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
