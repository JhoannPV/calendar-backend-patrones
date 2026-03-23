import { EventsDto } from "../events.dto";

export class DeleteEventDto extends EventsDto {
    private constructor(
        public id: string,
        user: { id: string },
    ) {
        super(user);
    }

    static build(id: string, user: { id: string }): DeleteEventDto {
        return new DeleteEventDto(id, user);
    }
}
