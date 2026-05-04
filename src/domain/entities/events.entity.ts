import { Types } from 'mongoose';

export class EventsEntity {
    constructor(
        public title:    string,
        public notes:    string,
        public start:    Date,
        public end:      Date,
        public bgColor:  string,
        public category: string,
        public user:     Types.ObjectId,
        public id?:      string,
        public parentId?: string | null, // COMPOSITE
    ) {}

    clone(): EventsEntity {
        return new EventsEntity(
            this.title, this.notes,
            new Date(this.start), new Date(this.end),
            this.bgColor, this.category,
            this.user, this.id,
            this.parentId,
        );
    }

    cloneWith(changes: Partial<EventsEntity>): EventsEntity {
        const copy = this.clone();
        return new EventsEntity(
            changes.title    ?? copy.title,
            changes.notes    ?? copy.notes,
            changes.start    ? new Date(changes.start) : copy.start,
            changes.end      ? new Date(changes.end)   : copy.end,
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
            parentId: this.parentId ?? null, // COMPOSITE
        };
    }
}