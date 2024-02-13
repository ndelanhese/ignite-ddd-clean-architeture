import { Either } from "@core/either";
import { Question } from "@forum-entities/question";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type GetQuestionByIdUseCaseProps = {
	id: string;
};

export type GetQuestionByIdUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;
