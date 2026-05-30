import { EventChangePayload } from './event-change.types';

export interface ObserverResult {
  observer: string;
  status: 'success' | 'error';
  message: string;
}

export interface EventObserver {
  notify(payload: EventChangePayload): Promise<ObserverResult>;
}