import { Either } from "@core/either";
import { Answer } from "@forum-entities/answer";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type EditAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
	content: string;
	attachmentsIds: string[];
};

export type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer;
	}
>;
