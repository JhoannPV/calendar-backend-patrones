import { BaseEvent, ColorDecoratorEvent, EventsEntity, EventsRepository } from '../..';
import { CompositeEvent } from '../../composite/composite-event';
import { LeafEvent } from '../../composite/leaf-event';
import { ICalendarComponent } from '../../composite/calendar-component.interface';

interface GetEventsUseCase {
  getEvents(): Promise<EventsEntity[]>;
}

export class GetEvents implements GetEventsUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents(): Promise<EventsEntity[]> {
    const events = await this.eventsRepository.getEvents();

    // Aplica Decorator a cada entidad (lógica existente)
    const decorated = events.map(event => {
      const base  = new BaseEvent(event);
      const color = new ColorDecoratorEvent(base);
      return color.getEvent();
    });

    // Aplica Composite: construye árbol y aplana en orden padre → hijos
    const map = new Map<string, ICalendarComponent>();

    // 1. Crear nodos
    for (const entity of decorated) {
      const id = entity.id?.toString() ?? '';
      if (!entity.parentId) {
        map.set(id, new CompositeEvent(entity)); // es padre potencial
      } else {
        map.set(id, new LeafEvent(entity));       // es hijo (hoja)
      }
    }

    // 2. Vincular hijos a sus padres
    for (const entity of decorated) {
      if (entity.parentId) {
        const parent = map.get(entity.parentId.toString());
        const child  = map.get(entity.id?.toString() ?? '');
        if (parent instanceof CompositeEvent && child) {
          parent.add(child);
        }
      }
    }

    // 3. Aplanar: primero los padres (con parentId null), luego sus hijos
    const result: EventsEntity[] = [];
    for (const component of map.values()) {
      if (!component.toEntity().parentId) {
        result.push(component.toEntity());
        for (const child of component.getChildren()) {
          result.push(child.toEntity());
        }
      }
    }

    return result;
  }
}