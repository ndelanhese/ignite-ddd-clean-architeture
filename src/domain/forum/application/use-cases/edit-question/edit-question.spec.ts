import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { makeQuestion } from "@test-factories/make-question";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit a question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to edit a question", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		const fakeQuestionContent = faker.lorem.text();
		const fakeQuestionTitle = faker.lorem.sentence();
		await sut.execute({
			authorId: authorId.toString(),
			questionId: questionId.toString(),
			content: fakeQuestionContent,
			title: fakeQuestionTitle,
		});

		const foundedQuestion = await inMemoryQuestionsRepository.findById(
			questionId.toString(),
		);

		expect(foundedQuestion).toMatchObject({
			title: fakeQuestionTitle,
			content: fakeQuestionContent,
		});
	});

	it("should not be able to edit a question from another author", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		const fakeQuestionContent = faker.lorem.text();
		const fakeQuestionTitle = faker.lorem.sentence();
		expect(
			async () =>
				await sut.execute({
					authorId: "wrong-author-id",
					questionId: questionId.toString(),
					content: fakeQuestionContent,
					title: fakeQuestionTitle,
				}),
		).rejects.toBeInstanceOf(Error);
	});
});
