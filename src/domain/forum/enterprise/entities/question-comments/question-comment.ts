import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionCommentProps } from "./question-comment.types";

export class QuestionComment extends Entity<QuestionCommentProps> {
	static create(
		props: Optional<QuestionCommentProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const questionComment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return questionComment;
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

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}
}
