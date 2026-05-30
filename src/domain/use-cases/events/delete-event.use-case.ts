import {
  BaseEvent,
  ColorDecoratorEvent,
  DeleteEventDto,
  EventPublisher,
  EventsRepository,
  ObserverResult,
} from '../..';

export interface DeleteEventResponse {
  msg: string;
  event: unknown;
  notifications: ObserverResult[];
}

interface DeleteEventUseCase {
  execute(event: DeleteEventDto): Promise<DeleteEventResponse>;
}

export class DeleteEvent implements DeleteEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(event: DeleteEventDto): Promise<DeleteEventResponse> {
    const deletedEvent = await this.eventsRepository.deleteEvent(event);

    const baseEvent = new BaseEvent(deletedEvent);
    const colorDecorator = new ColorDecoratorEvent(baseEvent);
    const decoratedEvent = colorDecorator.getEvent();

    const notifications = await this.eventPublisher.publish({
      action: 'deleted',
      event: decoratedEvent,
      triggeredBy: {
        id: event.user.id,
        email: event.user.email,
      },
      occurredAt: new Date(),
    });

    return {
      msg: 'Event deleted successfully',
      event: decoratedEvent,
      notifications,
    };
  }
}