import { randomUUID } from "crypto";
import { QuestionProps } from "./question.types";

export class Question {
		public id: string;
		public title: string;
		public content: string;
		public authorId: string;

		constructor(props: QuestionProps, id?: string) {
			this.title = props.title;
			this.content = props.content;
			this.authorId = props.authorId;
			this.id = id ?? randomUUID();
		}
	}
