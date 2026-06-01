import { MailClient, PushClient } from '../../config';
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
  private readonly mailClient = new MailClient();

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

      const actions: Promise<void>[] = [];
      actions.push(this.pushClient.sendToUser(triggeredBy.id, {
        title: `Recordatorio: ${event.title}`,
        body: `Tu evento "${event.title}" comienza el ${formattedStart}. Te aviso ${strategy.type === '1h' ? '1 hora' : '30 minutos'} antes.`,
        icon: '/favicon.svg',
      }));

      if (triggeredBy.email) {
        const subject = `Recordatorio: ${event.title}`;
        const html = `
          <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;">
            <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
              <div style="background:#2563eb;color:#ffffff;padding:20px 24px;">
                <h2 style="margin:0;font-size:20px;">Recordatorio de evento</h2>
              </div>
              <div style="padding:24px;color:#111827;">
                <p>Hola,</p>
                <p>Este es un recordatorio de tu evento <strong>${event.title}</strong>.</p>
                <p><strong>Fecha de inicio:</strong> ${formattedStart}</p>
                <p>Te aviso ${strategy.type === '1h' ? '1 hora' : '30 minutos'} antes.</p>
              </div>
            </div>
          </div>
        `;

        actions.push(this.mailClient.send(triggeredBy.email, subject, html));
      }

      await Promise.all(actions);
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
