import { makeQuestion } from "@test-factories/make-question";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch recent questions", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to fetch recent questions", async () => {
		const { newQuestion: firstQuestion } = makeQuestion({
			createdAt: new Date(2024, 0, 20),
		});
		const { newQuestion: secondQuestion } = makeQuestion({
			createdAt: new Date(2024, 0, 18),
		});
		const { newQuestion: thirtyQuestion } = makeQuestion({
			createdAt: new Date(2024, 0, 23),
		});

		await inMemoryQuestionsRepository.create(firstQuestion);
		await inMemoryQuestionsRepository.create(secondQuestion);
		await inMemoryQuestionsRepository.create(thirtyQuestion);

		const { questions } = await sut.execute({
			page: 1,
		});

		expect(questions).toHaveLength(3);
		expect(questions).toEqual([
			expect.objectContaining({
				createdAt: new Date(2024, 0, 23),
			}),
			expect.objectContaining({
				createdAt: new Date(2024, 0, 20),
			}),
			expect.objectContaining({
				createdAt: new Date(2024, 0, 18),
			}),
		]);
	});

	it("should be able to fetch paginated recent questions", async () => {
		for (let i = 1; i <= 22; i++) {
			const { newQuestion } = makeQuestion();
			await inMemoryQuestionsRepository.create(newQuestion);
		}

		const { questions } = await sut.execute({
			page: 2,
		});

		expect(questions).toHaveLength(2);
	});
});