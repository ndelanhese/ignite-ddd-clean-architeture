import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
	});

	it("should be able to create an answer", async () => {
		const result = await sut.execute({
			questionId: "1",
			instructorId: "1",
			content: "New answer",
		});

		const answer = result.value?.answer;
		const itemHasBeenCreated = inMemoryAnswerRepository.items.find(
			(item) => item.id === answer?.id,
		);

		expect(result.isLeft()).toBeFalsy();
		expect(answer?.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
		expect(answer?.content).toEqual("New answer");
	});
});
