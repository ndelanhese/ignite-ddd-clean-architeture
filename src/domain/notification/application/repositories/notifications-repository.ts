import { Notification } from "@notification-entities/notification";

export interface NotificationsRepository {
	create(notification: Notification): Promise<void>;
}
