import { Request, Response } from 'express';
<<<<<<< HEAD
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
=======
import { CreateEvent, CreateOperationDtoFactory, CustomError, DeleteEvent, DeleteEventDtoFactory, GetEvents, UpdateEvent, UpdateEventDtoFactory, DeleteEventCascade } from '../../domain';
import { EventsRepository } from '../../domain/repositories/events.repository';
>>>>>>> d3bb79afebadec41af6210519cd61a084805b5ff

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

<<<<<<< HEAD
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
=======
        if (error) return res.status(400).json({ error });
        if (!deleteEventDto) return res.status(400).json({ error: 'Invalid delete event dto' });
        new DeleteEvent(this.eventsRepository).deleteEvent(deleteEventDto)
            .then((event) => res.status(200).json({ event }))
            .catch((error) => this.handleError(error, res));
    }

    deleteEventCascade = (req: Request, res: Response) => {
        const [error, deleteEventDto] = this.deleteEventDtoFactory.create(req);

        if (error) return res.status(400).json({ error });
        if (!deleteEventDto) return res.status(400).json({ error: 'Invalid delete event dto' });

        new DeleteEventCascade(this.eventsRepository).deleteEventCascade(deleteEventDto)
            .then((result) => res.status(200).json({ events: result.events, msg: result.msg }))
            .catch((error) => this.handleError(error, res));
    }
>>>>>>> d3bb79afebadec41af6210519cd61a084805b5ff
}