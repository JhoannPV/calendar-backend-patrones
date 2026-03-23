import { UpdateEventDto } from "../../../..";
import { CustomError } from "../../../../errors/custom.error";
import { EventsDtoFactory } from "../events-dto.factory";

export class UpdateEventDtoFactory extends EventsDtoFactory {
    create(data: { [key: string]: any }): UpdateEventDto {
        const body = data.body;
        const params = data.params;
        const id = params.id;
        const { title, notes, start, end, bgColor, user } = body;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!title) throw CustomError.badRequest('Missing title');
        if (!start) throw CustomError.badRequest('Missing start');
        if (!end) throw CustomError.badRequest('Missing end');
        if (!bgColor) throw CustomError.badRequest('Missing bgColor');
        if (!user?.id) throw CustomError.badRequest('Missing user id');

        return UpdateEventDto.build(
            id,
            title,
            notes,
            new Date(start),
            new Date(end),
            bgColor,
            user,
        );
    }
}
