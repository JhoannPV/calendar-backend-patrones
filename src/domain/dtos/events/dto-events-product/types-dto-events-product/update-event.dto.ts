import { EventsDto } from "../../../..";

export class UpdateEventDto extends EventsDto {
    private constructor(
        public id: string,
        public title: string,
        public notes: string,
        public start: Date,
        public end: Date,
        public bgColor: string,
        public category: string,
        user: { id: string },
        public parentId?: string | null, // NUEVO
    ) {
        super(user);
    }

    static build(
        id: string,
        title: string,
        notes: string,
        start: Date | string,
        end: Date | string,
        bgColor: string,
        category: string,
        user: { id: string },
        parentId?: string | null, // NUEVO
    ): [string?, UpdateEventDto?] {
        if (!id) return ['Missing id'];
        if (!title) return ['Missing title'];
        if (!start) return ['Missing start'];
        if (!end) return ['Missing end'];
        if (!bgColor) return ['Missing bgColor'];
        if (!category) return ['Missing category'];
        if (!user?.id) return ['Missing user id'];

        return [undefined, new UpdateEventDto(
            id,
            title,
            notes,
            new Date(start),
            new Date(end),
            bgColor,
            category,
            user,
            parentId ?? null, // NUEVO
        )];
    }
}