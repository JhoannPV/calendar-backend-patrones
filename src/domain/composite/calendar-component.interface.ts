// src/domain/composite/calendar-component.interface.ts
import { EventsEntity } from '../entities/events.entity';

export interface ICalendarComponent {
  getId(): string | undefined;
  getTitle(): string;
  getChildren(): ICalendarComponent[];
  isComposite(): boolean;
  toEntity(): EventsEntity;
}