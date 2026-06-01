import { EventsEntity } from '../entities/events.entity';
import { NotificationScheduleStrategy } from './notification-schedule.strategy';

export class NotificationSchedulerContext {
  private strategy?: NotificationScheduleStrategy;

  constructor(strategy?: NotificationScheduleStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: NotificationScheduleStrategy): void {
    this.strategy = strategy;
  }

  execute(event: EventsEntity, callback: () => Promise<void>): void {
    if (!event.start) {
      console.warn('[NotificationScheduler] Event has no start date, skipping reminder schedule');
      return;
    }

    const strategy = this.strategy;
    if (!strategy) {
      console.warn('[NotificationScheduler] No strategy was set, skipping reminder schedule');
      return;
    }

    const delay = strategy.getReminderDelay(event.start);
    if (delay === null) {
      console.warn(
        `[NotificationScheduler] No reminder scheduled for event "${event.title}" using strategy "${strategy.type}"`
      );
      return;
    }

    setTimeout(async () => {
      try {
        await callback();
        console.log(
          `[NotificationScheduler] Reminder sent for event "${event.title}" using strategy "${strategy.type}"`
        );
      } catch (error) {
        console.error('[NotificationScheduler] Error sending reminder', error);
      }
    }, delay);
  }
}
