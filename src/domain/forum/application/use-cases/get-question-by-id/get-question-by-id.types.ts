import { Question } from "@forum-entities/question";

export type GetQuestionByIdUseCaseProps = {
	id: string;
};

export type GetQuestionByIdUseCaseResponse = {
	question: Question;
};
