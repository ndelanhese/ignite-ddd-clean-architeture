import { Entity } from "@core/entities/entity";
import { AnswerProps } from "./answer.types";

export class Answer extends Entity<AnswerProps> {
	get content() {
		return this.props.content;
	}
}
