import { Notification } from "../../enterprise/notification";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
}
