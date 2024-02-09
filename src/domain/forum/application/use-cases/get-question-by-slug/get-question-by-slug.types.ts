import { Question } from "@forum-entities/question";

export type GetQuestionBySlugUseCaseProps = {
	slug: string;
};

export type GetQuestionBySlugUseCaseResponse = {
	question: Question;
};
