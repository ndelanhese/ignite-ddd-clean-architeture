import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	EditAnswerUseCaseProps,
	EditAnswerUseCaseResponse,
} from "./edit-answer.types";

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseProps): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer nof found.");
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		answer.content = content;

		await this.answersRepository.save(answer);

		return {
			answer,
		};
	}
}
