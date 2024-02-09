import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";
import { QuestionsRepository } from "@forum-repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public items: Question[] = [];

	async findById(id: string): Promise<Question | null> {
		const uniqueEntityId = new UniqueEntityId(id);
		return (
			this.items.find(
				(item) => item.id.toValue() === uniqueEntityId.toValue(),
			) ?? null
		);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		return this.items.find((item) => item.slug.value === slug) ?? null;
	}

	async create(question: Question) {
		this.items.push(question);
	}
}
