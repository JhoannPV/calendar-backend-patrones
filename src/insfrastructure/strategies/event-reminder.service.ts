import { PushClient } from '../../config';
import { EventsEntity } from '../../domain';
import { NotificationSchedulerContext } from '../../domain/strategies/notification-scheduler.context';
import { NotificationStrategyFactory } from './notification-strategy.factory';
import { NotificationStrategyType } from '../../domain/strategies/notification-schedule.strategy';

interface ReminderTrigger {
  id: string;
  email?: string;
}

export class EventReminderService {
  private readonly pushClient = new PushClient();

  execute(
    event: EventsEntity,
    strategyType: NotificationStrategyType,
    triggeredBy: ReminderTrigger,
  ): void {
    if (!triggeredBy?.id) {
      console.warn('[EventReminderService] Missing user id, reminder not scheduled');
      return;
    }

    if (!event.start) {
      console.warn('[EventReminderService] Event has no start date, reminder not scheduled');
      return;
    }

    const strategy = NotificationStrategyFactory.create(strategyType);
    const scheduler = new NotificationSchedulerContext();
    scheduler.setStrategy(strategy);

    scheduler.execute(event, async () => {
      const formattedStart = event.start ? event.start.toLocaleString() : 'próximamente';
      await this.pushClient.sendToUser(triggeredBy.id, {
        title: `Recordatorio: ${event.title}`,
        body: `Tu evento "${event.title}" comienza el ${formattedStart}. Te aviso ${strategy.type === '1h' ? '1 hora' : '30 minutos'} antes.`,
        icon: '/favicon.svg',
      });
    });
  }

  // backward-compatible alias
  scheduleReminder(
    event: EventsEntity,
    strategyType: NotificationStrategyType,
    triggeredBy: ReminderTrigger,
  ): void {
    this.execute(event, strategyType, triggeredBy);
  }
}
