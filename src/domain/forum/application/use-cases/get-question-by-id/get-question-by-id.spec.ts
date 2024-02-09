import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";
import { Slug } from "@forum-value-objects/slug";
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
		const fakeQuestionId = new UniqueEntityId("123");
		const newQuestion = Question.create(
			{
				title: "Example question",
				slug: Slug.create("example-question"),
				authorId: new UniqueEntityId("1"),
				content: "Bla bla bla",
			},
			fakeQuestionId,
		);

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
