import {
  BaseEvent,
  ColorDecoratorEvent,
  DeleteEventDto,
  EventChangePayload,
  EventPublisher,
  EventsRepository,
  EventDelete,
} from '../..';

interface DeleteEventUseCase {
  execute(event: DeleteEventDto): Promise<EventDelete>;
}

export class DeleteEvent implements DeleteEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(event: DeleteEventDto): Promise<EventDelete> {
    const deletedEvent = await this.eventsRepository.deleteEvent(event);

    const baseEvent = new BaseEvent(deletedEvent);
    const colorDecorator = new ColorDecoratorEvent(baseEvent);
    const decoratedEvent = colorDecorator.getEvent();

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

    return {
      msg: 'Event deleted successfully',
      event: decoratedEvent,
    };
  }
}