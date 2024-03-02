import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionAttachment } from "@forum-entities/question-attachment";
import { Slug } from "@forum-value-objects/slug";

export type QuestionProps = {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	attachments: QuestionAttachment[];
	createdAt: Date;
	updatedAt?: Date;
};
