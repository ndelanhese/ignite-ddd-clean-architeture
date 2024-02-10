import { QuestionComment } from "@forum-entities/question-comments";

export interface QuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
}
