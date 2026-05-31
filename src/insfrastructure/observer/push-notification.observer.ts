import { EventChangePayload, EventObserver, ObserverResult } from '../../domain';
import { PushService } from '../services/push.service';

export class PushNotificationObserver implements EventObserver {
  constructor(private readonly pushService: PushService) {}

  async notify(payload: EventChangePayload): Promise<ObserverResult> {
    const { action, event, triggeredBy } = payload;

    if (!triggeredBy?.id) {
      return { observer: 'push', status: 'error', message: 'Sin userId para push' };
    }

    const actionText: Record<string, string> = {
      created: 'creado',
      updated: 'actualizado',
      deleted: 'eliminado',
    };

    try {
      await this.pushService.sendToUser(triggeredBy.id, {
        title: `Evento ${actionText[action] ?? action}`,
        body: `"${event.title}" fue ${actionText[action] ?? action}.`,
        icon: '/favicon.svg',
      });

      return {
        observer: 'push',
        status: 'success',
        message: `Push enviado por acción '${action}' sobre ${event.title}`,
      };
    } catch (error) {
      return {
        observer: 'push',
        status: 'error',
        message: error instanceof Error ? error.message : 'Error enviando push',
      };
    }
  }
}