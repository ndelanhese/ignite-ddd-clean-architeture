import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { makeAnswer } from "@test-factories/make-answer";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch question answers", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
	});

	it("should be able to fetch question answers", async () => {
		const fakeQuestionId = new UniqueEntityId(faker.music.songName());
		const { newAnswer: firstAnswer } = makeAnswer({
			questionId: fakeQuestionId,
		});
		const { newAnswer: secondAnswer } = makeAnswer({
			questionId: fakeQuestionId,
		});
		const { newAnswer: thirtyAnswer } = makeAnswer({
			questionId: fakeQuestionId,
		});

		await inMemoryAnswersRepository.create(firstAnswer);
		await inMemoryAnswersRepository.create(secondAnswer);
		await inMemoryAnswersRepository.create(thirtyAnswer);

		const { answers } = await sut.execute({
			questionId: fakeQuestionId.toString(),
			page: 1,
		});

		expect(answers).toHaveLength(3);
		expect(answers).toEqual([
			expect.objectContaining({
				questionId: fakeQuestionId,
			}),
			expect.objectContaining({
				questionId: fakeQuestionId,
			}),
			expect.objectContaining({
				questionId: fakeQuestionId,
			}),
		]);
	});

	it("should be able to fetch paginated question answers", async () => {
		const fakeQuestionId = new UniqueEntityId(faker.music.songName());
		for (let i = 1; i <= 22; i++) {
			const { newAnswer } = makeAnswer({
				questionId: fakeQuestionId,
			});
			await inMemoryAnswersRepository.create(newAnswer);
		}

		const { answers } = await sut.execute({
			questionId: fakeQuestionId.toString(),
			page: 2,
		});

		expect(answers).toHaveLength(2);
	});
});
