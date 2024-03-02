import { Either } from "@core/either";
import { Question } from "@forum-entities/question";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { ResourceNotFoundError } from "@forum-use-case-errors/resource-not-found-error";

export type EditQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
};

export type EditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{ question: Question }
>;
