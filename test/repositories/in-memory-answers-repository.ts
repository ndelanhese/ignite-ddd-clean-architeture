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

	async create(answer: Answer) {
		this.items.push(answer);
	}

	async delete(question: Answer): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items.splice(itemIndex, 1);
	}
}
