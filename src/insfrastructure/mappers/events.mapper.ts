import { CustomError, EventsEntity } from '../../domain';

export class EventsMapper {

    static EventEntityFromObject(object: { [key: string]: any }): EventsEntity {
        const { _id, id, title, start, end, bgColor, parentId } = object;

        let category = object['category'];
        let user     = object['user'];
        let notes    = object['notes'];

        if (!_id && !id) throw CustomError.badRequest('Missing id');
        if (!title)      throw CustomError.badRequest('Missing title');
        if (!bgColor)    throw CustomError.badRequest('Missing bgColor');

        // start y end son opcionales: evento padre no los tiene
        if (!category) category = 'general';

        if (!user) throw CustomError.badRequest('Missing user');

        user = {
            id:   user.id?.toString() ?? user._id?.toString() ?? user.toString(),
            name: user.name,
        };

        return new EventsEntity(
            title,
            notes,
            start ? new Date(start) : null,  // null si es evento padre
            end   ? new Date(end)   : null,   // null si es evento padre
            bgColor,
            category,
            user,
            _id?.toString() ?? id,
            parentId ? parentId.toString() : null, // COMPOSITE
        );
    }
}