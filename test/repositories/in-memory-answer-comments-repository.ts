import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AnswerComment } from "@forum-entities/answer-comment";
import { AnswerCommentsRepository } from "@forum-repositories/answer-comments-repository";

export class InMemoryAnswerCommentsRepository
	implements AnswerCommentsRepository
{
	public items: AnswerComment[] = [];

	async findById(id: string): Promise<AnswerComment | null> {
		const uniqueEntityId = new UniqueEntityId(id);
		return (
			this.items.find(
				(item) => item.id.toValue() === uniqueEntityId.toValue(),
			) ?? null
		);
	}

	async create(answerComment: AnswerComment) {
		this.items.push(answerComment);
	}

	async delete(answerComment: AnswerComment): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id === answerComment.id,
		);

		this.items.splice(itemIndex, 1);
	}
}
