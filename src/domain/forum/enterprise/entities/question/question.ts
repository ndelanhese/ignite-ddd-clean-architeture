import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionProps } from "./question.types";
import dayjs = require("dayjs");
import { Slug } from "@forum-value-objects/slug";

export class Question extends Entity<QuestionProps> {
	static create(
		props: Optional<QuestionProps, "createdAt" | "slug">,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				createdAt: new Date(),
			},
			id,
		);

		return question;
	}

	get authorId() {
		return this.props.authorId;
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get slug() {
		return this.props.slug;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, "days") <= 3;
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

	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);
		this.touch();
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}
}
