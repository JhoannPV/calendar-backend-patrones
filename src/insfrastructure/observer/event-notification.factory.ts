import { EventNotificationPublisher } from '../../domain';
import { EmailNotificationObserver } from './email-notification.observer';
import { PushNotificationObserver } from './push-notification.observer';
import { GoogleCalendarObserver } from './google-calendar.observer';

export class EventNotificationFactory {
  static createPublisher(): EventNotificationPublisher {
    const publisher = new EventNotificationPublisher();

    publisher.subscribe(new EmailNotificationObserver());
    publisher.subscribe(new PushNotificationObserver());
    publisher.subscribe(new GoogleCalendarObserver());

    return publisher;
  }
}