import { UpdateEventDto } from "../../../..";
import { EventsDtoFactory } from "../events-dto.factory";

export class UpdateEventDtoFactory extends EventsDtoFactory {
    create(data: { [key: string]: any }): [string?, UpdateEventDto?] {
        const body = data.body;
        const params = data.params;
        const id = params.id;
        const { title, notes, start, end, bgColor, category, user } = body;

        return UpdateEventDto.build(
            id,
            title,
            notes,
            start,
            end,
            bgColor,
            category,
            user,
        );
    }
}
