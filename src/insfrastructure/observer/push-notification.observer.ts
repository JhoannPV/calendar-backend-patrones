import {
  EventChangePayload,
  EventObserver,
  ObserverResult,
} from '../../domain';

export class PushNotificationObserver implements EventObserver {
  async notify(payload: EventChangePayload): Promise<ObserverResult> {
    const { action, event } = payload;

    return {
      observer: 'push',
      status: 'success',
      message: `Push enviado por acción ${action} sobre "${event.title}"`,
    };
  }
}