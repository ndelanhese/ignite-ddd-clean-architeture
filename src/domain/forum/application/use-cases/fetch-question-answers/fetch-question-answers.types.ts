import { Answer } from "@forum-entities/answer";

export type FetchQuestionAnswersUseCaseProps = {
	questionId: string;
	page: number;
};

export type FetchQuestionAnswersUseCaseResponse = {
	answers: Answer[];
};
