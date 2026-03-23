import { CreateEventDto, DeleteEventDto, EventsRepository, EventsEntity, EventsDatasource, UpdateEventDto } from "../../domain";

export class EventsRepositoryImpl implements EventsRepository {
    constructor(
        private readonly eventDatasource: EventsDatasource,
    ) { }

    getEvents(): Promise<EventsEntity[]> {
        return this.eventDatasource.getEvents();
    }

    createEvent(event: CreateEventDto): Promise<EventsEntity> {
        return this.eventDatasource.createEvent(event);
    }

    updateEvent(event: UpdateEventDto): Promise<EventsEntity> {
        return this.eventDatasource.updateEvent(event);
    }

    deleteEvent(event: DeleteEventDto): Promise<EventsEntity> {
        return this.eventDatasource.deleteEvent(event);
    }
}