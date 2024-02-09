import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type AnswerProps = {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
};
