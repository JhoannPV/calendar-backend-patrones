import { EventNotificationPublisher } from '../../domain';
import { EmailNotificationObserver } from './email-notification.observer';
import { PushNotificationObserver } from './push-notification.observer';
import { GoogleCalendarObserver } from './google-calendar.observer';
import { EmailService } from '../services/email.service';

export class EventNotificationFactory {
  static createPublisher(): EventNotificationPublisher {
    const publisher = new EventNotificationPublisher();
    const emailService = new EmailService();

    publisher.subscribe(new EmailNotificationObserver(emailService));
    publisher.subscribe(new PushNotificationObserver());
    publisher.subscribe(new GoogleCalendarObserver());

    return publisher;
  }
}