import { AnswersRepository } from "@forum-repositories/answers-repository";
import { DeleteAnswerUseCaseProps } from "./delete-answer.types";

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseProps): Promise<void> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer nof found.");
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		await this.answersRepository.delete(answer);
	}
}
