import { Question } from "@forum-entities/question";

export type FetchRecentQuestionsUseCaseProps = {
	page: number;
};

export type FetchRecentQuestionsUseCaseResponse = {
	questions: Question[];
};
