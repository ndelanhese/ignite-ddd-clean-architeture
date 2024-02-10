import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AnswerProps } from "./answer.types";

export class Answer extends Entity<AnswerProps> {
	static create(
		props: Optional<AnswerProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answer;
	}

	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get content() {
		return this.props.content;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get except() {
		return this.content.substring(0, 120).trim().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}
}
