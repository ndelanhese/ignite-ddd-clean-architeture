import { Slug } from "@value-objects/slug";

export type QuestionProps = {
	title: string;
	slug: Slug;
	content: string;
	authorId: string;
};
