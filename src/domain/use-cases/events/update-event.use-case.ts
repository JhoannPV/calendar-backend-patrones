import {
  BaseEvent,
  ColorDecoratorEvent,
  EventChangePayload,
  EventPublisher,
  EventsEntity,
  EventsRepository,
  EventUpdate,
  UpdateEventDto,
} from '../..';

interface UpdateEventUseCase {
  execute(event: UpdateEventDto): Promise<EventUpdate>;
}

export class UpdateEvent implements UpdateEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(event: UpdateEventDto): Promise<EventUpdate> {
    const updatedEvent = await this.eventsRepository.updateEvent(event);

    const baseEvent = new BaseEvent(updatedEvent);
    const colorDecorator = new ColorDecoratorEvent(baseEvent);
    const decoratedEvent = colorDecorator.getEvent();

    const payload: EventChangePayload = {
      action: 'updated',
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
      event: decoratedEvent,
    };
  }
}