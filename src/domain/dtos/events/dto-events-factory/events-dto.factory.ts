import { EventsDto } from "../../..";

export abstract class EventsDtoFactory {
    abstract create(data: { [key: string]: any }): EventsDto;
}
