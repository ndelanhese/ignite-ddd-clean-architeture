import { Question } from "@forum-entities/question";

export interface QuestionsRepository {
	findBySlug(slug: string): Promise<Question | null>;
	findById(id: string): Promise<Question | null>;
	create(question: Question): Promise<void>;
}
