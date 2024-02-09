import { Question } from "@forum-entities/question";

export interface QuestionsRepository {
	create(question: Question): Promise<void>;
}
