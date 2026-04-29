import { EventsEntity } from "../../entities/events.entity";
import { EventItem } from "../event-item";

export class BaseEvent implements EventItem {
    constructor(public eventEntity: EventsEntity) { }

    getEvent(): EventsEntity {
        return this.eventEntity;
    }
}