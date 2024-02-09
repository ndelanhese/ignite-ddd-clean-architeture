import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";
import { Slug } from "@forum-value-objects/slug";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question by slug", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to get a question by slug", async () => {
		const newQuestion = Question.create({
			title: "Example question",
			slug: Slug.create("example-question"),
			authorId: new UniqueEntityId("1"),
			content: "Bla bla bla",
		});

		await inMemoryQuestionsRepository.create(newQuestion);

		const { question } = await sut.execute({
			slug: "example-question",
		});

		expect(question.id).toBeTruthy();
		expect(question.id).toEqual(newQuestion.id);
		expect(question.slug.value).toEqual(newQuestion.slug.value);
		expect(question.title).toEqual(newQuestion.title);
	});
});
