import { Request, Response } from 'express';
import { CreateEvent, CreateOperationDtoFactory, CustomError, DeleteEvent, DeleteEventDtoFactory, GetEvents, UpdateEvent, UpdateEventDtoFactory } from '../../domain';
import { EventsRepository } from '../../domain/repositories/events.repository';

export class EventsController {

    private readonly createOperationDtoFactory = new CreateOperationDtoFactory();
    private readonly updateEventDtoFactory = new UpdateEventDtoFactory();
    private readonly deleteEventDtoFactory = new DeleteEventDtoFactory();

    constructor(
        private readonly eventsRepository: EventsRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    getEvents = (req: Request, res: Response) => {
        new GetEvents(this.eventsRepository).getEvents()
            .then((events) => res.status(200).json({
                events,
            }))
            .catch((error) => this.handleError(error, res));
    }

    createEvent = (req: Request, res: Response) => {
        const createEventDtoFactory = this.createOperationDtoFactory.createDtoFactory().createEvent();

        const createEventDto = createEventDtoFactory.create(req);

        new CreateEvent(this.eventsRepository).createEvent(createEventDto)
            .then((event) => res.status(201).json({ event }))
            .catch((error) => this.handleError(error, res));
    }

    updateEvent = (req: Request, res: Response) => {
        const updateEventDto = this.updateEventDtoFactory.create(req);

        new UpdateEvent(this.eventsRepository).updateEvent(updateEventDto)
            .then((event) => res.status(200).json({ event }))
            .catch((error) => this.handleError(error, res));
    }

    deleteEvent = (req: Request, res: Response) => {
        const deleteEventDto = this.deleteEventDtoFactory.create(req);

        new DeleteEvent(this.eventsRepository).deleteEvent(deleteEventDto)
            .then((event) => res.status(200).json({ event }))
            .catch((error) => this.handleError(error, res));
    }
}