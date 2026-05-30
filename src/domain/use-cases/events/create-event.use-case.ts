import {
  BaseEvent,
  ColorDecoratorEvent,
  CreateEventDto,
  EventPublisher,
  EventsEntity,
  EventsRepository,
  ObserverResult,
} from '../..';

export interface CreateEventResponse {
  event: EventsEntity;
  notifications: ObserverResult[];
}

interface CreateEventUseCase {
  execute(event: CreateEventDto): Promise<CreateEventResponse>;
}

export class CreateEvent implements CreateEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(event: CreateEventDto): Promise<CreateEventResponse> {
    const newEvent = await this.eventsRepository.createEvent(event);

    const baseEvent = new BaseEvent(newEvent);
    const colorDecorator = new ColorDecoratorEvent(baseEvent);
    const decoratedEvent = colorDecorator.getEvent();

    const notifications = await this.eventPublisher.publish({
      action: 'created',
      event: decoratedEvent,
      triggeredBy: {
        id: event.user.id,
      },
      occurredAt: new Date(),
    });

    return {
      event: decoratedEvent,
      notifications,
    };
  }
}