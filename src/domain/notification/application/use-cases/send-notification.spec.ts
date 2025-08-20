import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to create a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "New notification",
      content: "notification content",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryNotificationsRepository.items).toHaveLength(1);

      const saved = inMemoryNotificationsRepository.items[0];
      expect(saved.recipientId.toString()).toBe("1");
      expect(saved.title).toBe("New notification");
      expect(saved.content).toBe("notification content");
    }
  });
});
