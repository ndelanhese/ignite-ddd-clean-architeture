import { Answer } from "@forum-entities/answer";

export type EditAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
	content: string;
};

export type EditAnswerUseCaseResponse = {
	answer: Answer;
};
