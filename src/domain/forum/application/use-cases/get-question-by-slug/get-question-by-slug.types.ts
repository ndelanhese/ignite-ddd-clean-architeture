import { Either } from "@core/either";
import { Question } from "@forum-entities/question";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type GetQuestionBySlugUseCaseProps = {
	slug: string;
};

export type GetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;
