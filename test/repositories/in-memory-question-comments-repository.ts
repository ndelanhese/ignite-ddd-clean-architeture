import { QuestionComment } from "@forum-entities/question-comment";
import { QuestionCommentsRepository } from "@forum-repositories/question-comments-repository";

export class InMemoryQuestionCommentsRepository
	implements QuestionCommentsRepository
{
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}
}
