import { Question } from "@forum-entities/question";

export type EditQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
};

export type EditQuestionUseCaseResponse = {
	question: Question;
};
