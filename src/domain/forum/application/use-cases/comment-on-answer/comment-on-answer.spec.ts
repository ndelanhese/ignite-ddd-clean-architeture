import { makeAnswer } from "@test-factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "@test-repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Create Answer comment", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository,
		);
	});

	it("should be able to comment on answer", async () => {
		const { newAnswer } = makeAnswer();

		await inMemoryAnswersRepository.create(newAnswer);

		const { answerComment } = await sut.execute({
			authorId: "1",
			content: "bla bla bla",
			answerId: newAnswer.id.toString(),
		});

		const itemHasBeenCreated = inMemoryAnswerCommentsRepository.items.find(
			(item) => item.id.toString() === answerComment.id.toString(),
		);

		expect(answerComment.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
	});
});
