import { makeQuestion } from "@test-factories/make-question";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { GetQuestionByIdUseCase } from "./get-question-by-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionByIdUseCase;

describe("Get question by id", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionByIdUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to get a question by id", async () => {
		const { fakeQuestionId, newQuestion } = makeQuestion();

		await inMemoryQuestionsRepository.create(newQuestion);

		const { question } = await sut.execute({
			id: fakeQuestionId.toString(),
		});

		expect(question.id).toBeTruthy();
		expect(question.id.toValue()).toEqual(newQuestion.id.toValue());
		expect(question.slug.value).toEqual(newQuestion.slug.value);
		expect(question.title).toEqual(newQuestion.title);
	});
});
