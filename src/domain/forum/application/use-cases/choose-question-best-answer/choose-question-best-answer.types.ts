import { Either } from "@core/either";
import { Question } from "@forum-entities/question";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type ChooseQuestionBestAnswerUseCaseProps = {
	answerId: string;
	authorId: string;
};

export type ChooseQuestionBestAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question;
	}
>;
