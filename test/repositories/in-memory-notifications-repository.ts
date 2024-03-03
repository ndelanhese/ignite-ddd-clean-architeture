import { Notification } from "@notification-entities/notification";
import { NotificationsRepository } from "@notification-repositories/notifications-repository";

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	public items: Notification[] = [];

	async create(notification: Notification) {
		this.items.push(notification);
	}
}
