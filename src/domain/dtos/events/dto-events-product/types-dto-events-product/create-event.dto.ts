import { EventsDto } from "../../../..";

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
        start: Date | string,
        end: Date | string,
        bgColor: string,
        user: { id: string },
    ): [string?, CreateEventDto?] {
        if (!title) return ['Missing title'];
        if (!start) return ['Missing start'];
        if (!end) return ['Missing end'];
        if (!bgColor) return ['Missing bgColor'];
        if (!user?.id) return ['Missing user id'];

        return [undefined, new CreateEventDto(
            title,
            notes,
            new Date(start),
            new Date(end),
            bgColor,
            user,
        )];
    }
}
