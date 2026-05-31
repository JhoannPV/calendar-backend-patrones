import {
  EventChangePayload,
  EventObserver,
  ObserverResult,
} from '../../domain';

export class GoogleCalendarObserver implements EventObserver {
  async notify(payload: EventChangePayload): Promise<ObserverResult> {
    const { action, event } = payload;

    return {
      observer: 'google-calendar',
      status: 'success',
      message: `Sincronización con Google Calendar para "${event.title}"`,
    };
  }
}