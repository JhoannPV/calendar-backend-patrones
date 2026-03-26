import { DeleteEventDto } from "../../../..";
import { EventsDtoFactory } from "../events-dto.factory";

export class DeleteEventDtoFactory extends EventsDtoFactory {
    create(data: { [key: string]: any }): [string?, DeleteEventDto?] {
        const body = data.body;
        const params = data.params;
        const id = params.id;
        const user = body.user;

        return DeleteEventDto.build(id, user);
    }
}
