import { BaseEvent, ColorDecoratorEvent, EventsEntity, EventsRepository } from "../..";

interface GetEventsUseCase {
    getEvents(): Promise<EventsEntity[]>;
}

export class GetEvents implements GetEventsUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async getEvents(): Promise<EventsEntity[]> {

        const events = await this.eventsRepository.getEvents();

        const decoratedEvents = events.map(event => {
            const baseEvent = new BaseEvent(event);
            const colorDecorator = new ColorDecoratorEvent(baseEvent);
            return colorDecorator.getEvent();
        });

        return decoratedEvents;
    }

}