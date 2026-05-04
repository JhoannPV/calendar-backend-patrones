// src/domain/composite/leaf-event.ts
import { EventsEntity } from '../entities/events.entity';
import { ICalendarComponent } from './calendar-component.interface';

export class LeafEvent implements ICalendarComponent {
  constructor(private readonly entity: EventsEntity) {}

  getId()    { return this.entity.id?.toString(); }
  getTitle() { return this.entity.title; }
  getChildren(): ICalendarComponent[] { return []; }
  isComposite() { return false; }
  toEntity()  { return this.entity; }
}