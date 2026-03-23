import { DeleteEventDto } from "../../../..";
import { CustomError } from "../../../../errors/custom.error";
import { EventsDtoFactory } from "../events-dto.factory";

export class DeleteEventDtoFactory extends EventsDtoFactory {
    create(data: { [key: string]: any }): DeleteEventDto {
        const body = data.body;
        const params = data.params;
        const id = params.id;
        const user = body.user;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!user?.id) throw CustomError.badRequest('Missing user id');

        return DeleteEventDto.build(id, user);
    }
}
