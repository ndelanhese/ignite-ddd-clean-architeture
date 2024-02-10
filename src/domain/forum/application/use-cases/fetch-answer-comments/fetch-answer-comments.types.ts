import { AnswerComment } from "@forum-entities/answer-comment";

export type FetchAnswerCommentsUseCaseProps = {
	answerId: string;
	page: number;
};

export type FetchAnswerCommentsUseCaseResponse = {
	answerComments: AnswerComment[];
};
