import { CreateEventDto } from "../../../..";
import { CustomError } from "../../../../errors/custom.error";
import { EventsDtoFactory } from "../events-dto.factory";

export class CreateEventDtoFactory extends EventsDtoFactory {
    create(data: { [key: string]: any }): CreateEventDto {
        const body = data.body;
        const { title, notes, start, end, bgColor, user } = body;

        if (!title) throw CustomError.badRequest('Missing title');
        if (!start) throw CustomError.badRequest('Missing start');
        if (!end) throw CustomError.badRequest('Missing end');
        if (!bgColor) throw CustomError.badRequest('Missing bgColor');
        if (!user?.id) throw CustomError.badRequest('Missing user id');

        return CreateEventDto.build(
            title,
            notes,
            new Date(start),
            new Date(end),
            bgColor,
            user,
        );
    }
}
