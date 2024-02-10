import { PaginationParams } from "@core/repositories/pagination-params";
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

	async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
		const question = this.items
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20);

		return question;
	}

	async save(question: Question): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items[itemIndex] = question;
	}

	async create(question: Question) {
		this.items.push(question);
	}

	async delete(question: Question): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items.splice(itemIndex, 1);
	}
}
