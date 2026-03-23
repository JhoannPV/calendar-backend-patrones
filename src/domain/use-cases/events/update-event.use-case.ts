import { EventsEntity, EventsRepository, UpdateEventDto } from "../..";

interface UpdateEventUseCase {
    updateEvent(event: UpdateEventDto): Promise<EventsEntity>;
}

export class UpdateEvent implements UpdateEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async updateEvent(event: UpdateEventDto): Promise<EventsEntity> {

        const updateEvent = await this.eventsRepository.updateEvent(event);

        return updateEvent;
    }
}