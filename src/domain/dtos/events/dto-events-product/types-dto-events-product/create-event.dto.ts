import { EventsDto } from "../events.dto";

export class CreateEventDto extends EventsDto {
    private constructor(
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
        title: string,
        notes: string,
        start: Date,
        end: Date,
        bgColor: string,
        user: { id: string },
    ): CreateEventDto {
        return new CreateEventDto(title, notes, start, end, bgColor, user);
    }
}
