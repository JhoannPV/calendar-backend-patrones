import { EventsDto } from "../../../..";

export class DeleteEventDto extends EventsDto {
    private constructor(
        public id: string,
        user: { id: string; email: string },
    ) {
        super(user);
    }

    static build(id: string, user: { id: string; email: string }): [string?, DeleteEventDto?] {
        if (!id) return ['Missing id'];
        if (!user?.id) return ['Missing user id'];
        if (!user?.email) return ['Missing user email'];

        return [undefined, new DeleteEventDto(id, user)];
    }
}
