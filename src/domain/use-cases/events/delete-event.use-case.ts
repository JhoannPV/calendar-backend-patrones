import { BaseEvent, ColorDecoratorEvent, DeleteEventDto, EventDelete, EventsRepository } from "../..";

interface DeleteEventUseCase {
    deleteEvent(event: DeleteEventDto): Promise<EventDelete>;
}

export class DeleteEvent implements DeleteEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async deleteEvent(event: DeleteEventDto): Promise<EventDelete> {

        const deletedEvent = await this.eventsRepository.deleteEvent(event);

        const baseEvent = new BaseEvent(deletedEvent);

        const colorDecorator = new ColorDecoratorEvent(baseEvent);

        return {
            msg: 'Event deleted successfully',
            event: colorDecorator.getEvent()
        };
    }
}