import { EventNotificationPublisher } from '../../domain';
import { EmailNotificationObserver } from './email-notification.observer';
import { PushNotificationObserver } from './push-notification.observer';
import { GoogleCalendarObserver } from './google-calendar.observer';
import { EmailService } from '../services/email.service';
import { PushService } from '../services/push.service';

export class EventNotificationFactory {
  static createPublisher(): EventNotificationPublisher {
    const publisher = new EventNotificationPublisher();
    publisher.subscribe(new EmailNotificationObserver(new EmailService()));
    publisher.subscribe(new PushNotificationObserver(new PushService())); // <-- real
    publisher.subscribe(new GoogleCalendarObserver());
    return publisher;
  }
}