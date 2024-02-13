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

		const result = await sut.execute({
			id: fakeQuestionId.toString(),
		});

		if (result.isLeft()) throw new Error(result.value.message);

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.question).toBeTruthy();
		expect(result.value?.question.id).toBeTruthy();
		expect(result.value?.question.id.toValue()).toEqual(
			newQuestion.id.toValue(),
		);
		expect(result.value?.question.slug.value).toEqual(newQuestion.slug.value);
		expect(result.value?.question.title).toEqual(newQuestion.title);
	});
});
