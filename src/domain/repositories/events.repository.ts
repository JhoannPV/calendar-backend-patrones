import { CreateEventDto, DeleteEventDto, EventsEntity, UpdateEventDto } from "..";

export abstract class EventsRepository {

    abstract getEvents(): Promise<EventsEntity[]>;

    abstract createEvent(event: CreateEventDto): Promise<EventsEntity>;

    abstract updateEvent(event: UpdateEventDto): Promise<EventsEntity>;

    abstract deleteEvent(event: DeleteEventDto): Promise<EventsEntity>;

}