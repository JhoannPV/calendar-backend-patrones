import { EventItem, EventsEntity } from "../..";

export abstract class DecoratorEvent implements EventItem {
    constructor(protected eventItem: EventItem) { }

    abstract getEvent(): EventsEntity;
}