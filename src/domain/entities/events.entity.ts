import { Types } from 'mongoose';

export class EventsEntity {
    constructor(
        public title:    string,
        public notes:    string,
        public start:    Date | null,
        public end:      Date | null,
        public bgColor:  string,
        public category: string,
        public user:     Types.ObjectId,
        public id?:      string,
        public parentId?: string | null, // COMPOSITE
    ) {}

    clone(): EventsEntity {
        return new EventsEntity(
            this.title,
            this.notes,
            this.start ? new Date(this.start) : null,
            this.end   ? new Date(this.end)   : null,
            this.bgColor,
            this.category,
            this.user,
            this.id,
            this.parentId,
        );
    }

    cloneWith(changes: Partial<EventsEntity>): EventsEntity {
        const copy = this.clone();
        return new EventsEntity(
            changes.title    ?? copy.title,
            changes.notes    ?? copy.notes,
            // Si el cambio trae explícitamente null/Date lo usa; si no está, conserva el actual
            changes.start !== undefined
                ? (changes.start ? new Date(changes.start) : null)
                : copy.start,
            changes.end !== undefined
                ? (changes.end ? new Date(changes.end) : null)
                : copy.end,
            changes.bgColor  ?? copy.bgColor,
            changes.category ?? copy.category,
            changes.user     ?? copy.user,
            changes.id       ?? copy.id,
            changes.parentId !== undefined ? changes.parentId : copy.parentId,
        );
    }

    toUpdateObject() {
        return {
            title:    this.title,
            notes:    this.notes,
            start:    this.start,
            end:      this.end,
            bgColor:  this.bgColor,
            category: this.category,
            parentId: this.parentId ?? null,
        };
    }
}