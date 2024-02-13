import { Either } from "@core/either";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type DeleteAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
};

export type DeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
