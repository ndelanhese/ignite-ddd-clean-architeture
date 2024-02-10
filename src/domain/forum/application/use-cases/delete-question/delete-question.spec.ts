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
		const { newQuestion } = makeQuestion({}, new UniqueEntityId("question-1"));

		await inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			questionId: "question-1",
		});

		const hasItemInMemory =
			await inMemoryQuestionsRepository.findById("question-1");

		expect(hasItemInMemory).toBeNull();
	});
});
