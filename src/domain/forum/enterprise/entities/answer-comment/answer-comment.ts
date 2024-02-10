import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AnswerCommentProps } from "./answer-comment.types";

export class AnswerComment extends Entity<AnswerCommentProps> {
	static create(
		props: Optional<AnswerCommentProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const answerComment = new AnswerComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answerComment;
	}

	get authorId() {
		return this.props.authorId;
	}

	get answerId() {
		return this.props.answerId;
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

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}
}
