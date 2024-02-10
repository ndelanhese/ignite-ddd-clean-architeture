import { AnswerComment } from "@forum-entities/answer-comment";

export interface AnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
}
