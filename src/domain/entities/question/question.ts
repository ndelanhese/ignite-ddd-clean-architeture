import { randomUUID } from "crypto";
import { Slug } from "@value-objects/slug";
import { QuestionProps } from "./question.types";

export class Question {
	public id: string;
	public cachorro: string;
	public slug: Slug;
	public content: string;
	public authorId: string;

	constructor(props: QuestionProps, id?: string) {
		this.cachorro = props.title;
		this.slug = props.slug;
		this.content = props.content;
		this.authorId = props.authorId;
		this.id = id ?? randomUUID();
	}
}
