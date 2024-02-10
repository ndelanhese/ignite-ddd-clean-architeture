import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Answer } from "@forum-entities/answer";
import { AnswersRepository } from "@forum-repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	async findById(id: string): Promise<Answer | null> {
		const uniqueEntityId = new UniqueEntityId(id);
		return (
			this.items.find(
				(item) => item.id.toValue() === uniqueEntityId.toValue(),
			) ?? null
		);
	}

	async save(answer: Answer): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items[itemIndex] = answer;
	}

	async create(answer: Answer) {
		this.items.push(answer);
	}

	async delete(answer: Answer): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items.splice(itemIndex, 1);
	}
}
