import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type QuestionCommentProps = {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
};
