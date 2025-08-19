import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "New question",
      content: "question content",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryQuestionsRepository.items).toHaveLength(1);

      const saved = inMemoryQuestionsRepository.items[0];
      expect(saved.authorId.toString()).toBe("1");
      expect(saved.title).toBe("New question");
      expect(saved.content).toBe("question content");
      expect(saved.attachments.currentItems).toHaveLength(2);
      expect(saved.attachments.currentItems).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityID("2") }),
      ]);
    }
  });
});
