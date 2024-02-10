import { AnswerComment } from "@forum-entities/answer-comment";

export type CommentOnAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
	content: string;
};

export type CommentOnAnswerUseCaseResponse = {
	answerComment: AnswerComment;
};
