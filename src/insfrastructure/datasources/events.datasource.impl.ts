import { EventsMapper } from '..';
import { EventModel } from '../../data/mongodb';
import {
    CreateEventDto, CustomError, DeleteEventDto,
    EventsEntity, EventsDatasource, UpdateEventDto,
} from '../../domain';

export class EventsDatasourceImpl implements EventsDatasource {
    constructor() {}

    async getEvents(): Promise<EventsEntity[]> {
        try {
            const events = await EventModel.find().populate('user', 'name');
            if (!events) throw CustomError.notFound('No events found');
            return events.map((event: { [key: string]: any; }) => EventsMapper.EventEntityFromObject(event));
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async createEvent(event: CreateEventDto): Promise<EventsEntity> {
        try {
            const newEvent = await EventModel.create({
                title:    event.title,
                notes:    event.notes,
                start:    event.start,
                end:      event.end,
                bgColor:  event.bgColor,
                category: event.category,
                user:     event.user.id,
                parentId: event.parentId ?? null, // COMPOSITE
            });
            await newEvent.populate('user', 'name');
            return EventsMapper.EventEntityFromObject(newEvent);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async updateEvent(event: UpdateEventDto): Promise<EventsEntity> {
        try {
            const existingEvent = await EventModel.findById(event.id);
            if (!existingEvent) throw CustomError.notFound('Event not found');
            if (existingEvent.user.toString() !== event.user.id)
                throw CustomError.unauthorized('You do not have permission to edit this event');

            const existingEventEntity = EventsMapper.EventEntityFromObject(existingEvent);
            const updatedEventEntity = existingEventEntity.cloneWith({
                title:    event.title,
                notes:    event.notes,
                start:    event.start,
                end:      event.end,
                bgColor:  event.bgColor,
                category: event.category,
            });

            const updatedEvent = await EventModel.findByIdAndUpdate(
                event.id,
                updatedEventEntity.toUpdateObject(),
                { returnDocument: 'after' }
            );
            if (!updatedEvent) throw CustomError.notFound('Event not found after update');
            await updatedEvent.populate('user', 'name');
            return EventsMapper.EventEntityFromObject(updatedEvent);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async deleteEvent(event: DeleteEventDto): Promise<EventsEntity> {
        try {
            const existingEvent = await EventModel.findById(event.id);
            if (!existingEvent) throw CustomError.notFound('Event not found');
            if (existingEvent.user.toString() !== event.user.id)
                throw CustomError.unauthorized('You do not have permission to delete this event');

            const deletedEvent = await EventModel.findByIdAndDelete(event.id);
            if (!deletedEvent) throw CustomError.notFound('Event not found after delete');
            await deletedEvent.populate('user', 'name');
            return EventsMapper.EventEntityFromObject(deletedEvent);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }
}