import { CreateEventDto, EventsEntity, EventsRepository } from "../..";

interface CreateEventUseCase {
    createEvent(event: CreateEventDto): Promise<EventsEntity>;
}

export class CreateEvent implements CreateEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async createEvent(event: CreateEventDto): Promise<EventsEntity> {

        const newEvent = await this.eventsRepository.createEvent(event);

        return newEvent;
    }
}