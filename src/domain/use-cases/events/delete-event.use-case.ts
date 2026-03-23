import { DeleteEventDto, EventDelete, EventsRepository } from "../..";

interface DeleteEventUseCase {
    deleteEvent(event: DeleteEventDto): Promise<EventDelete>;
}

export class DeleteEvent implements DeleteEventUseCase {
    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    async deleteEvent(event: DeleteEventDto): Promise<EventDelete> {

        const deletedEvent = await this.eventsRepository.deleteEvent(event);

        return {
            msg: 'Event deleted successfully',
            event: deletedEvent
        };
    }
}