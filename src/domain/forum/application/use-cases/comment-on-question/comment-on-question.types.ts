import { QuestionComment } from "@forum-entities/question-comment";

export type CommentOnQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
	content: string;
};

export type CommentOnQuestionUseCaseResponse = {
	questionComment: QuestionComment;
};