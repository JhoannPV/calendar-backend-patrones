import { NotificationScheduleStrategy } from './notification-schedule.strategy';

const ONE_HOUR = 60 * 60 * 1000;

export class NotifyBeforeOneHourStrategy implements NotificationScheduleStrategy {
  readonly type: '1h' = '1h';

  getReminderDelay(eventStart: Date, now: Date = new Date()): number | null {
    if (!eventStart || eventStart <= now) return null;

    const targetDate = new Date(eventStart.getTime() - ONE_HOUR);
    const delay = targetDate.getTime() - now.getTime();

    if (delay < 0) return null;
    return delay;
  }
}
