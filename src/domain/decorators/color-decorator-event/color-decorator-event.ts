import { DecoratorEvent, EventItem, EventsEntity } from "../..";

interface ColorPriority {
    color: string;
    event: EventsEntity;
}

export class ColorDecoratorEvent extends DecoratorEvent {
    constructor(eventItem: EventItem) {
        super(eventItem);
    }

    assignPriorityColor(): ColorPriority {
        const event = this.eventItem.getEvent();
        const now = new Date();
        const eventEnd = new Date(event.end);

        // Calcular el tiempo restante hasta que termine el evento
        const diffTime = eventEnd.getTime() - now.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        // Clasificar por urgencia
        if (diffDays < 1 && diffDays >= 0) {
            // Urgente: menos de 24 horas
            return { color: '#FF0000', event: event }; // Rojo
        } else if (diffDays >= 1 && diffDays <= 7) {
            // Medio: 1 a 7 días
            return { color: '#FFA500', event: event }; // Amarillo
        } else if (diffDays > 7) {
            // Bajo: más de 7 días
            return { color: '#00CC00', event: event }; // Verde
        }

        // Evento pasado o en el pasado
        return { color: '#000000', event: event }; // Negro
    }

    modifyEventColor(colorEvent: ColorPriority): EventsEntity {
        const modifiedEvent = colorEvent.event.cloneWith({ bgColor: colorEvent.color });
        return modifiedEvent;
    }

    getEvent() {
        const colorEvent = this.assignPriorityColor();
        return this.modifyEventColor(colorEvent);
    }
}