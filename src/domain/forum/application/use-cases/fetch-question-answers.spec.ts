import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { FetchQuestionAnswersUseCase } from "./fecth-question-answers";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch question answers", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") }),
    );

    const result = await sut.execute({ questionId: "question-1", page: 1 });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(3);
    }
  });

  it("should be able to fetch paginated question answers", async () => {
    await Promise.all(
      Array.from({ length: 22 }).map(() =>
        inMemoryAnswersRepository.create(
          makeAnswer({ questionId: new UniqueEntityID("question-1") }),
        ),
      ),
    );

    const result = await sut.execute({ questionId: "question-1", page: 2 });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(2);
    }
  });
});
