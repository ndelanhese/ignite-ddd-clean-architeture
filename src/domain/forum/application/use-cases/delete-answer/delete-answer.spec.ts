import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@forum-use-case-errors/not-allowed-error";
import { makeAnswer } from "@test-factories/make-answer";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete an answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to delete an answer", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			authorId: authorId.toString(),
			answerId: answerId.toString(),
		});

		const hasItemInMemory = await inMemoryAnswersRepository.findById(
			answerId.toString(),
		);

		expect(hasItemInMemory).toBeNull();
	});

	it("should not be able to delete an answer from another author", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			authorId: "wrong-author-id",
			answerId: answerId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
