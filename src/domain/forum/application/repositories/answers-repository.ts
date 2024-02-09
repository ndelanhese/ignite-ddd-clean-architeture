import { Answer } from "@forum-entities/answer";

export interface AnswersRepository {
	create(answer: Answer): Promise<void>;
}
