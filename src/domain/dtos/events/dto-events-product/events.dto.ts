export abstract class EventsDto {
    protected constructor(
        public user: { id: string },
    ) { }
}
