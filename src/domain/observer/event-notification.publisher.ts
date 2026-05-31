import { EventObserver, ObserverResult } from './event-observer.interface';
import { EventPublisher } from './event-publisher.interface';
import { EventChangePayload } from './event-change.types';

export class EventNotificationPublisher implements EventPublisher {
  private observers: EventObserver[] = [];

  subscribe(observer: EventObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: EventObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  async publish(payload: EventChangePayload): Promise<ObserverResult[]> {
    return Promise.all(this.observers.map(observer => observer.notify(payload)));
  }
}