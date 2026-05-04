// src/domain/composite/composite-event.ts
import { EventsEntity } from '../entities/events.entity';
import { ICalendarComponent } from './calendar-component.interface';

export class CompositeEvent implements ICalendarComponent {
  private children: ICalendarComponent[] = [];

  constructor(private readonly entity: EventsEntity) {}

  getId()    { return this.entity.id?.toString(); }
  getTitle() { return this.entity.title; }
  getChildren() { return this.children; }
  isComposite() { return true; }
  toEntity()   { return this.entity; }

  add(component: ICalendarComponent): void {
    this.children.push(component);
  }

  remove(id: string): void {
    this.children = this.children.filter(c => c.getId() !== id);
  }
}