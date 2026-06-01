import {
  NotificationScheduleStrategy,
  NotificationStrategyType,
} from '../../domain/strategies/notification-schedule.strategy';
import { NotifyBeforeOneHourStrategy } from '../../domain/strategies/notify-before-one-hour.strategy';
import { NotifyBeforeThirtyMinutesStrategy } from '../../domain/strategies/notify-before-thirty-minutes.strategy';

export class NotificationStrategyFactory {
  static create(type: NotificationStrategyType): NotificationScheduleStrategy {
    switch (type) {
      case '1h':
        return new NotifyBeforeOneHourStrategy();
      case '30min':
      default:
        return new NotifyBeforeThirtyMinutesStrategy();
    }
  }
}
