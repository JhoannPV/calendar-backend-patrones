import { NotificationScheduleStrategy } from './notification-schedule.strategy';

const THIRTY_MINUTES = 30 * 60 * 1000;

export class NotifyBeforeThirtyMinutesStrategy implements NotificationScheduleStrategy {
  readonly type: '30min' = '30min';

  getReminderDelay(eventStart: Date, now: Date = new Date()): number | null {
    if (!eventStart || eventStart <= now) return null;

    const targetDate = new Date(eventStart.getTime() - THIRTY_MINUTES);
    const delay = targetDate.getTime() - now.getTime();

    if (delay < 0) return null;
    return delay;
  }
}
