import { Answer } from "@forum-entities/answer";

export type AnswerQuestionUseCaseProps = {
	instructorId: string;
	questionId: string;
	content: string;
};

export type AnswerQuestionUseCaseResponse = {
	answer: Answer;
};
