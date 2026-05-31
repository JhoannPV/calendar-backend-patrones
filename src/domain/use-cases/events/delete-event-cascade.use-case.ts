import { BaseEvent, ColorDecoratorEvent, DeleteEventDto, EventsDelete, EventsEntity, EventsRepository } from "../..";

interface DeleteEventCascadeUseCase {
    deleteEventCascade(event: DeleteEventDto): Promise<EventsDelete>;
}

export class DeleteEventCascade implements DeleteEventCascadeUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async deleteEventCascade(event: DeleteEventDto): Promise<EventsDelete> {
        const deletedEvents = await this.eventsRepository.deleteEventCascade(event);

        // Apply decorators to each entity
        const decorated = deletedEvents.map((ev: EventsEntity) => {
            const base = new BaseEvent(ev);
            const color = new ColorDecoratorEvent(base);
            return color.getEvent();
        });

        return {
            msg: 'Events deleted successfully',
            events: decorated,
        };
    }
}
