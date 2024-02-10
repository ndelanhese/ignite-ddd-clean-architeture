import { makeQuestion } from "@test-factories/make-question";
import { InMemoryQuestionCommentsRepository } from "@test-repositories/in-memory-question-comments-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question comment", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new CommentOnQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionCommentsRepository,
		);
	});

	it("should be able to comment on question", async () => {
		const { newQuestion } = makeQuestion();

		await inMemoryQuestionsRepository.create(newQuestion);

		const { questionComment } = await sut.execute({
			authorId: "1",
			content: "bla bla bla",
			questionId: newQuestion.id.toString(),
		});

		const itemHasBeenCreated = inMemoryQuestionCommentsRepository.items.find(
			(item) => item.id.toString() === questionComment.id.toString(),
		);

		expect(questionComment.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
	});
});
