import { EventsMapper } from "..";
import { EventModel } from "../../data/mongodb";
import { CreateEventDto, CustomError, DeleteEventDto, EventsEntity, EventsDatasource, UpdateEventDto } from "../../domain";

export class EventsDatasourceImpl implements EventsDatasource {
    constructor(
    ) { }

    async getEvents(): Promise<EventsEntity[]> {
        try {
            const events = await EventModel.find().populate('user', 'name');
            if (!events) throw CustomError.notFound('No events found');

            const mappedEvents: EventsEntity[] = events.map(event => EventsMapper.EventEntityFromObject(event));

            return mappedEvents;

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async createEvent(event: CreateEventDto): Promise<EventsEntity> {
        try {
            const newEvent = await EventModel.create({
                title: event.title,
                notes: event.notes,
                start: event.start,
                bgColor: event.bgColor,
                end: event.end,
                user: event.user.id,
            });

            await newEvent.save();
            // Asegura que el campo user esté poblado con el nombre para devolver {_id, name}
            await newEvent.populate('user', 'name');

            return EventsMapper.EventEntityFromObject(newEvent);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async updateEvent(event: UpdateEventDto): Promise<EventsEntity> {
        try {
            const existingEvent = await EventModel
                .findById(event.id);
            if (!existingEvent) throw CustomError.notFound('Event not found');

            if (existingEvent.user.toString() !== event.user.id) {
                throw CustomError.unauthorized('You do not have permission to edit this event');
            }

            const updatedEvent = await EventModel.findByIdAndUpdate(event.id, {
                title: event.title,
                notes: event.notes,
                start: event.start,
                bgColor: event.bgColor,
                end: event.end,
            }, { returnDocument: 'after' });
            if (!updatedEvent) throw CustomError.notFound('Event not found after update');

            await updatedEvent.populate('user', 'name');

            return EventsMapper.EventEntityFromObject(updatedEvent);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async deleteEvent(event: DeleteEventDto): Promise<EventsEntity> {
        try {
            const existingEvent = await EventModel
                .findById(event.id);

            if (!existingEvent) throw CustomError.notFound('Event not found');

            if (existingEvent.user.toString() !== event.user.id) {
                throw CustomError.unauthorized('You do not have permission to delete this event');
            }

            const deletedEvent = await EventModel.findByIdAndDelete(event.id);
            if (!deletedEvent) throw CustomError.notFound('Event not found after delete');

            await deletedEvent.populate('user', 'name');

            return EventsMapper.EventEntityFromObject(deletedEvent);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}