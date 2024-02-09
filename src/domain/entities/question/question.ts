import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionProps } from "./question.types";

export class Question extends Entity<QuestionProps> {
	static create(
		props: Optional<QuestionProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				createdAt: new Date(),
			},
			id,
		);

		return question;
	}
}
