import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { makeAnswer } from "@test-factories/make-answer";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit an answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to edit an answer", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		const fakeAnswerContent = faker.lorem.text();
		await sut.execute({
			authorId: authorId.toString(),
			answerId: answerId.toString(),
			content: fakeAnswerContent,
		});

		const foundedAnswer = await inMemoryAnswersRepository.findById(
			answerId.toString(),
		);

		expect(foundedAnswer).toMatchObject({
			content: fakeAnswerContent,
		});
	});

	it("should not be able to edit an answer from another author", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		const fakeAnswerContent = faker.lorem.text();

		const result = await sut.execute({
			authorId: "wrong-author-id",
			answerId: answerId.toString(),
			content: fakeAnswerContent,
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
