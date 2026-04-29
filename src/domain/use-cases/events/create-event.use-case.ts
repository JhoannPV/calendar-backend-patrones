import { BaseEvent, ColorDecoratorEvent, CreateEventDto, EventsEntity, EventsRepository } from "../..";

interface CreateEventUseCase {
    createEvent(event: CreateEventDto): Promise<EventsEntity>;
}

export class CreateEvent implements CreateEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async createEvent(event: CreateEventDto): Promise<EventsEntity> {

        const newEvent = await this.eventsRepository.createEvent(event);

        const baseEvent = new BaseEvent(newEvent);

        const colorDecorator = new ColorDecoratorEvent(baseEvent);

        return colorDecorator.getEvent();
    }
}