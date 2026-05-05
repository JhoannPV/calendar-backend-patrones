import { EventsDto } from '../../../..';

export class UpdateEventDto extends EventsDto {
    private constructor(
        public id:       string,
        public title:    string,
        public notes:    string,
        public start:    Date | null,
        public end:      Date | null,
        public bgColor:  string,
        public category: string,
        user: { id: string },
        public parentId?: string | null,
    ) {
        super(user);
    }

    static build(
        id:       string,
        title:    string,
        notes:    string,
        start:    Date | string | null,
        end:      Date | string | null,
        bgColor:  string,
        category: string,
        user:     { id: string },
        parentId?: string | null,
    ): [string?, UpdateEventDto?] {
        if (!id)       return ['Missing id'];
        if (!title)    return ['Missing title'];
        if (!bgColor)  return ['Missing bgColor'];
        if (!category) return ['Missing category'];
        if (!user?.id) return ['Missing user id'];

        const isSubEvent = !!parentId;

        if (isSubEvent) {
            if (!start) return ['Missing start date for sub-event'];
            if (!end)   return ['Missing end date for sub-event'];
            const startDate = new Date(start);
            const endDate   = new Date(end);
            if (endDate <= startDate) return ['End date must be after start date'];
        } else {
            if (start && end) {
                const startDate = new Date(start);
                const endDate   = new Date(end);
                if (endDate <= startDate) return ['End date must be after start date'];
            }
        }

        return [undefined, new UpdateEventDto(
            id,
            title,
            notes,
            start ? new Date(start) : null,
            end   ? new Date(end)   : null,
            bgColor,
            category,
            user,
            parentId ?? null,
        )];
    }
}