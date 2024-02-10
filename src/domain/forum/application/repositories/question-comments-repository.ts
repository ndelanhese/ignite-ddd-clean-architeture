import { QuestionComment } from "@forum-entities/question-comment";

export interface QuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
}
