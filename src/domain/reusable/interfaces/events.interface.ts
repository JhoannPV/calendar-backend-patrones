import { EventsEntity } from '../../entities/events.entity';

export interface EventDelete {
    msg: string,
    event: EventsEntity,
}

export interface EventsDelete {
    msg: string,
    events: EventsEntity[]
}

// Response interface for create-event use case
export interface EventCreate {
    event: EventsEntity;
}

// Response interface for update-event use case
export interface EventUpdate {
    event: EventsEntity;
}