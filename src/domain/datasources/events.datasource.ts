import { CreateEventDto, DeleteEventDto, EventsEntity, UpdateEventDto } from "..";

export abstract class EventsDatasource {

    abstract getEvents(): Promise<EventsEntity[]>;

    abstract createEvent(event: CreateEventDto): Promise<EventsEntity>;

    abstract updateEvent(event: UpdateEventDto): Promise<EventsEntity>;

    abstract deleteEvent(event: DeleteEventDto): Promise<EventsEntity>;

    // Delete a parent and its descendants returning the deleted entities (for undo)
    abstract deleteEventCascade(event: DeleteEventDto): Promise<EventsEntity[]>;

}