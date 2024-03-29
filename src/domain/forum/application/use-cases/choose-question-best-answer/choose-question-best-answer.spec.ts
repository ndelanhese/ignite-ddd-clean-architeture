import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { makeAnswer } from "@test-factories/make-answer";
import { makeQuestion } from "@test-factories/make-question";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question best answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new ChooseQuestionBestAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryQuestionsRepository,
		);
	});

	it("should be able to choose the question best answer", async () => {
		const { newQuestion } = makeQuestion();
		const { newAnswer } = makeAnswer({
			questionId: newQuestion.id,
		});

		await inMemoryQuestionsRepository.create(newQuestion);
		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: newQuestion.authorId.toString(),
		});

		const foundedQuestion = await inMemoryQuestionsRepository.findById(
			newQuestion.id.toString(),
		);

		expect(foundedQuestion?.bestAnswerId?.toString()).toEqual(
			newAnswer.id.toString(),
		);
	});

	it("should not be able to choose another user question best answer", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);
		const { newAnswer } = makeAnswer({
			questionId: newQuestion.id,
		});

		await inMemoryQuestionsRepository.create(newQuestion);
		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			authorId: "wrong-author-id",
			answerId: newAnswer.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
