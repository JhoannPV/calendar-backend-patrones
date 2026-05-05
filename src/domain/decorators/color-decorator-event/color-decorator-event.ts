import { DecoratorEvent, EventItem, EventsEntity } from '../..';

export class ColorDecoratorEvent extends DecoratorEvent {
    constructor(eventItem: EventItem) {
        super(eventItem);
    }

    assignPriorityColor(event: EventsEntity): string {
        // Evento padre sin fechas → color gris neutro
        if (!event.end) return '#6c757d';

        const now      = new Date();
        const eventEnd = new Date(event.end);

        const diffTime = eventEnd.getTime() - now.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 1 && diffDays >= 0) return '#FF0000'; // Urgente
        if (diffDays >= 1 && diffDays <= 7) return '#FFA500'; // Medio
        if (diffDays > 7)                   return '#00CC00'; // Tranquilo
        return '#000000';                                      // Pasado
    }

    modifyEventColor(event: EventsEntity, color: string): EventsEntity {
        return event.cloneWith({ bgColor: color });
    }

    getEvent() {
        const event = this.eventItem.getEvent();
        const color = this.assignPriorityColor(event);
        return this.modifyEventColor(event, color);
    }
}