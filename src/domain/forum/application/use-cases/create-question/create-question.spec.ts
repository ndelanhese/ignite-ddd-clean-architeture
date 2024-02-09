import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Questions", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to create a question", async () => {
		const { question } = await sut.execute({
			authorId: "1",
			content: "bla bla bla",
			title: "Title test",
		});

		const itemHasBeenCreated = inMemoryQuestionsRepository.items.find(
			(item) => item.id === question.id,
		);

		expect(question.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
		expect(question.slug.value).toEqual("title-test");
		expect(question.title).toEqual("Title test");
	});
});
