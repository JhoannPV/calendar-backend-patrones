import { CreateEventDto, DeleteEventDto, EventsEntity, EventsRepository, UpdateEventDto } from "../../domain";

export class EventsRepositoryProxy implements EventsRepository {

    private cache: EventsEntity[] | null = null;
    private lastFetch: number = 0;
    private readonly TTL = 1000 * 60 * 5; // 5 minutos

    constructor(
        private readonly realRepository: EventsRepository
    ) { }

    async getEvents(): Promise<EventsEntity[]> {

        const now = Date.now();

        // 1. Validar caché
        if (this.cache && (now - this.lastFetch < this.TTL)) {
            return this.cache;
        }

        // 2. Ir a BD (a través del repo real)
        const events = await this.realRepository.getEvents();

        // 3. Guardar en caché
        this.cache = events;
        this.lastFetch = now;

        return events;
    }

    async createEvent(event: CreateEventDto): Promise<EventsEntity> {
        const result = await this.realRepository.createEvent(event);

        // invalidar caché
        this.cache = null;

        return result;
    }

    async updateEvent(event: UpdateEventDto): Promise<EventsEntity> {
        const result = await this.realRepository.updateEvent(event);

        // invalidar caché
        this.cache = null;

        return result;
    }

    async deleteEvent(event: DeleteEventDto): Promise<EventsEntity> {
        const result = await this.realRepository.deleteEvent(event);

        // invalidar caché
        this.cache = null;

        return result;
    }
}