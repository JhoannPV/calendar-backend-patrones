import { DecoratorEvent, EventItem, EventsEntity } from "../..";

export class ColorDecoratorEvent extends DecoratorEvent {
    constructor(eventItem: EventItem) {
        super(eventItem);
    }

    assignPriorityColor(event: EventsEntity): string {
        const now = new Date();
        const eventEnd = new Date(event.end);

        // Calcular el tiempo restante hasta que termine el evento
        const diffTime = eventEnd.getTime() - now.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        // Clasificar por urgencia
        if (diffDays < 1 && diffDays >= 0) {
            // Urgente: menos de 24 horas
            return '#FF0000'; // Rojo
        } else if (diffDays >= 1 && diffDays <= 7) {
            // Medio: 1 a 7 días
            return '#FFA500'; // Amarillo
        } else if (diffDays > 7) {
            // Bajo: más de 7 días
            return '#00CC00'; // Verde
        }

        // Evento pasado o en el pasado
        return '#000000'; // Negro
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