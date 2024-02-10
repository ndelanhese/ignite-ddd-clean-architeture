import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type AnswerCommentProps = {
	authorId: UniqueEntityId;
	answerId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
};
