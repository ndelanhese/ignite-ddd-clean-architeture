import { Question } from "@forum-entities/question";

export type CreateQuestionUseCaseProps = {
	authorId: string;
	title: string;
	content: string;
};

export type CreateQuestionUseCaseResponse = {
	question: Question;
};
