import { Request, Response } from 'express';
import {
  CreateEvent,
  CreateOperationDtoFactory,
  CustomError,
  DeleteEvent,
  DeleteEventDtoFactory,
  GetEvents,
  UpdateEvent,
  UpdateEventDtoFactory,
} from '../../domain';

export class EventsController {
  private readonly createOperationDtoFactory = new CreateOperationDtoFactory();
  private readonly updateEventDtoFactory = new UpdateEventDtoFactory();
  private readonly deleteEventDtoFactory = new DeleteEventDtoFactory();

  constructor(
    private readonly getEventsUseCase: GetEvents,
    private readonly createEventUseCase: CreateEvent,
    private readonly updateEventUseCase: UpdateEvent,
    private readonly deleteEventUseCase: DeleteEvent
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  getEvents = (req: Request, res: Response) => {
    this.getEventsUseCase
      .getEvents()
      .then(events => res.status(200).json(events))
      .catch(error => this.handleError(error, res));
  };

  createEvent = (req: Request, res: Response) => {
    const createEventDtoFactory =
      this.createOperationDtoFactory.createDtoFactory().createEvent;

    const [error, createEventDto] = createEventDtoFactory().create(req);

    if (error) return res.status(400).json({ error });
    if (!createEventDto) {
      return res.status(400).json({ error: 'Invalid create event dto' });
    }

    this.createEventUseCase
      .execute(createEventDto)
      .then(event => res.status(201).json(event))
      .catch(error => this.handleError(error, res));
  };

  updateEvent = (req: Request, res: Response) => {
    const [error, updateEventDto] = this.updateEventDtoFactory.create(req);

    if (error) return res.status(400).json({ error });
    if (!updateEventDto) {
      return res.status(400).json({ error: 'Invalid update event dto' });
    }

    this.updateEventUseCase
      .execute(updateEventDto)
      .then(event => res.status(200).json(event))
      .catch(error => this.handleError(error, res));
  };

  deleteEvent = (req: Request, res: Response) => {
    const [error, deleteEventDto] = this.deleteEventDtoFactory.create(req);

    if (error) return res.status(400).json({ error });
    if (!deleteEventDto) {
      return res.status(400).json({ error: 'Invalid delete event dto' });
    }

    this.deleteEventUseCase
      .execute(deleteEventDto)
      .then(event => res.status(200).json(event))
      .catch(error => this.handleError(error, res));
  };
}