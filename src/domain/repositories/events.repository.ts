import { CreateEventDto, DeleteEventDto, EventsEntity, UpdateEventDto } from "..";

export abstract class EventsRepository {

    abstract getEvents(): Promise<EventsEntity[]>;

    abstract createEvent(event: CreateEventDto): Promise<EventsEntity>;

    abstract updateEvent(event: UpdateEventDto): Promise<EventsEntity>;

    abstract deleteEvent(event: DeleteEventDto): Promise<EventsEntity>;

    // Delete a parent and its descendants, returning the deleted entities
    abstract deleteEventCascade(event: DeleteEventDto): Promise<EventsEntity[]>;

}