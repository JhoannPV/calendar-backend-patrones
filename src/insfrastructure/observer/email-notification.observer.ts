import {
  EventChangePayload,
  EventObserver,
  ObserverResult,
} from '../../domain';

export class EmailNotificationObserver implements EventObserver {
  async notify(payload: EventChangePayload): Promise<ObserverResult> {
    const { action, event } = payload;

    return {
      observer: 'email',
      status: 'success',
      message: `Email enviado por acción ${action} sobre "${event.title}"`,
    };
  }
}