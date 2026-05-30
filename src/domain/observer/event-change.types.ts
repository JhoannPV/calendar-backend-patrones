import { EventsEntity } from '..';

export type EventAction = 'created' | 'updated' | 'deleted';

export interface EventChangePayload {
  action: EventAction;
  event: EventsEntity;
  triggeredBy: {
    id: string;
    name?: string;
    email?: string;
  };
  occurredAt: Date;
}