import { Answer } from "@forum-entities/answer";
import { AnswersRepository } from "@forum-repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}
}
