import { EventNotificationPublisher } from '../../domain';
import { EmailNotificationObserver } from './email-notification.observer';
import { PushNotificationObserver } from './push-notification.observer';
import { MailClient, PushClient } from '../../config';

export class EventNotificationFactory {
  static createPublisher(): EventNotificationPublisher {
    const publisher = new EventNotificationPublisher();
    publisher.subscribe(new EmailNotificationObserver(new MailClient()));
    publisher.subscribe(new PushNotificationObserver(new PushClient())); // <-- real
    return publisher;
  }
}