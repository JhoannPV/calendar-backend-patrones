import { CustomError, EventsEntity } from '../../domain';

export class EventsMapper {
    static EventEntityFromObject(object: { [key: string]: any }): EventsEntity {
        const { _id, id, title, start, end, bgColor, parentId } = object;
        let category = object['category'];
        let user     = object['user'];
        let notes    = object['notes'];

        if (!id && !_id) throw CustomError.badRequest('Missing id');
        if (!title)      throw CustomError.badRequest('Missing title');
        if (!start)      throw CustomError.badRequest('Missing start');
        if (!end)        throw CustomError.badRequest('Missing end');
        if (!bgColor)    throw CustomError.badRequest('Missing bgColor');
        if (!category)   category = 'general';
        if (!user)       throw CustomError.badRequest('Missing user');

        user = { id: user._id?.toString() ?? user.id ?? user.toString(), name: user.name };

        return new EventsEntity(
            title, notes, start, end, bgColor, category,
            user,
            id ?? _id,
            parentId ? parentId.toString() : null, // COMPOSITE — se envía como "parentId" al frontend
        );
    }
}