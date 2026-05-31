import {
  BaseEvent,
  ColorDecoratorEvent,
  CreateEventDto,
  EventChangePayload,
  EventPublisher,
  EventsEntity,
  EventsRepository,
  EventCreate,
} from '../..';

interface CreateEventUseCase {
  execute(event: CreateEventDto): Promise<EventCreate>;
}

export class CreateEvent implements CreateEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(event: CreateEventDto): Promise<EventCreate> {
    const newEvent = await this.eventsRepository.createEvent(event);

    const baseEvent = new BaseEvent(newEvent);
    const colorDecorator = new ColorDecoratorEvent(baseEvent);
    const decoratedEvent = colorDecorator.getEvent();

    const payload: EventChangePayload = {
      action: 'created',
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