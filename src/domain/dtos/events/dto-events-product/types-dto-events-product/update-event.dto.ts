import { EventsDto } from "../events.dto";

export class UpdateEventDto extends EventsDto {
    private constructor(
        public id: string,
        public title: string,
        public notes: string,
        public start: Date,
        public end: Date,
        public bgColor: string,
        user: { id: string },
    ) {
        super(user);
    }

    static build(
        id: string,
        title: string,
        notes: string,
        start: Date,
        end: Date,
        bgColor: string,
        user: { id: string },
    ): UpdateEventDto {
        return new UpdateEventDto(id, title, notes, start, end, bgColor, user);
    }
}
