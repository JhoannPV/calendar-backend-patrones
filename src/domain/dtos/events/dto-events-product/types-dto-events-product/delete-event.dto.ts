import { EventsDto } from "../../../..";

export class DeleteEventDto extends EventsDto {
    private constructor(
        public id: string,
        user: { id: string },
    ) {
        super(user);
    }

    static build(id: string, user: { id: string }): [string?, DeleteEventDto?] {
        if (!id) return ['Missing id'];
        if (!user?.id) return ['Missing user id'];

        return [undefined, new DeleteEventDto(id, user)];
    }
}
