import { CreateEventDto } from "../../../..";
import { EventsDtoFactory } from "../events-dto.factory";

export class CreateEventDtoFactory extends EventsDtoFactory {
    create(data: { [key: string]: any }): [string?, CreateEventDto?] {
        const body = data.body;
        const { title, notes, start, end, bgColor, user } = body;

        return CreateEventDto.build(
            title,
            notes,
            start,
            end,
            bgColor,
            user,
        );
    }
}
