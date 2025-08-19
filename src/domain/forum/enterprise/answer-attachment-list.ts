import { WatchedList } from "@/core/entities/watched-list";
import { AnswerAttachment } from "./entities/answer-attachment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  // eslint-disable-next-line class-methods-use-this
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}
