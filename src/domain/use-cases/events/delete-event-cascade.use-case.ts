import {
    BaseEvent,
    ColorDecoratorEvent,
    DeleteEventDto,
    EventChangePayload,
    EventPublisher,
    EventsDelete,
    EventsEntity,
    EventsRepository,
} from "../..";

interface DeleteEventCascadeUseCase {
    deleteEventCascade(event: DeleteEventDto): Promise<EventsDelete>;
}

export class DeleteEventCascade implements DeleteEventCascadeUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
        private readonly eventPublisher: EventPublisher,
    ) { }

    async deleteEventCascade(event: DeleteEventDto): Promise<EventsDelete> {
        const deletedEvents = await this.eventsRepository.deleteEventCascade(event);

        // Apply decorators to each entity
        const decorated = deletedEvents.map((ev: EventsEntity) => {
            const base = new BaseEvent(ev);
            const color = new ColorDecoratorEvent(base);
            return color.getEvent();
        });

        decorated.forEach((decoratedEvent) => {
            const payload: EventChangePayload = {
                action: 'deleted',
                event: decoratedEvent,
                triggeredBy: {
                    id: event.user.id,
                    email: event.user.email,
                },
                occurredAt: new Date(),
            };

            setImmediate(() => {
                this.eventPublisher.publish(payload).catch(err => console.error('publish error', err));
            });
        });

        return {
            msg: 'Events deleted successfully',
            events: decorated,
        };
    }
}
