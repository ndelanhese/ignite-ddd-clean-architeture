import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Slug } from "@forum-value-objects/slug";

export type QuestionProps = {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
};
