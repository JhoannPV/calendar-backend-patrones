export type NotificationStrategyType = '30min' | '1h';

export interface NotificationScheduleStrategy {
  type: NotificationStrategyType;
  getReminderDelay(eventStart: Date, now?: Date): number | null;
}
