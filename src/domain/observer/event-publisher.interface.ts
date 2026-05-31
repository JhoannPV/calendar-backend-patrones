import { EventObserver, ObserverResult } from './event-observer.interface';
import { EventChangePayload } from './event-change.types';

export interface EventPublisher {
  subscribe(observer: EventObserver): void;
  unsubscribe(observer: EventObserver): void;
  publish(payload: EventChangePayload): Promise<ObserverResult[]>;
}