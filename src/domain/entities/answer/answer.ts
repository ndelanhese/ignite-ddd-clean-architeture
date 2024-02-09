import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AnswerProps } from "./answer.types";

export class Answer extends Entity<AnswerProps> {
	get content() {
		return this.props.content;
	}

	static create(
		props: Optional<AnswerProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: new Date(),
			},
			id,
		);

		return answer;
	}
}
