import { EventsEntity } from "..";

export interface EventItem {
    getEvent(): EventsEntity;
}