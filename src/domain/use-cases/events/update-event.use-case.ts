import {
  BaseEvent,
  ColorDecoratorEvent,
  EventPublisher,
  EventsEntity,
  EventsRepository,
  ObserverResult,
  UpdateEventDto,
} from '../..';

export interface UpdateEventResponse {
  event: EventsEntity;
  notifications: ObserverResult[];
}

interface UpdateEventUseCase {
  execute(event: UpdateEventDto): Promise<UpdateEventResponse>;
}

export class UpdateEvent implements UpdateEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(event: UpdateEventDto): Promise<UpdateEventResponse> {
    const updatedEvent = await this.eventsRepository.updateEvent(event);

    const baseEvent = new BaseEvent(updatedEvent);
    const colorDecorator = new ColorDecoratorEvent(baseEvent);
    const decoratedEvent = colorDecorator.getEvent();

    const notifications = await this.eventPublisher.publish({
      action: 'updated',
      event: decoratedEvent,
      triggeredBy: {
        id: event.user.id,
        email: event.user.email,
      },
      occurredAt: new Date(),
    });

    return {
      event: decoratedEvent,
      notifications,
    };
  }
}