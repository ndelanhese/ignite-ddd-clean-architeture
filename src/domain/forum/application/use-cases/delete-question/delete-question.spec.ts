import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { makeQuestion } from "@test-factories/make-question";
import InMemoryQuestionsRepository from "@test-repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete a question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to delete a question", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			authorId: authorId.toString(),
			questionId: questionId.toString(),
		});

		const hasItemInMemory = await inMemoryQuestionsRepository.findById(
			questionId.toString(),
		);

		expect(hasItemInMemory).toBeNull();
	});

	it("should not be able to delete a question from another author", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		expect(
			async () =>
				await sut.execute({
					authorId: "wrong-author-id",
					questionId: questionId.toString(),
				}),
		).rejects.toBeInstanceOf(Error);
	});
});
