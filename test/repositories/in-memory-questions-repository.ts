import { Question } from "@forum-entities/question";
import { QuestionsRepository } from "@forum-repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}
}
