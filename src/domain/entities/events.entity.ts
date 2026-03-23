import { Types } from 'mongoose';

export class EventsEntity {
    constructor(
        public title: string,
        public notes: string,
        public start: Date,
        public end: Date,
        public bgColor: string,
        public user: Types.ObjectId,
        public _id?: number) { }

    clone(): EventsEntity {
        return new EventsEntity(
            this.title,
            this.notes,
            new Date(this.start),
            new Date(this.end),
            this.bgColor,
            this.user,
            this._id
        );
    }

    cloneWith(changes: Partial<EventsEntity>): EventsEntity {
        const copy = this.clone();

        return new EventsEntity(
            changes.title ?? copy.title,
            changes.notes ?? copy.notes,
            changes.start ? new Date(changes.start) : copy.start,
            changes.end ? new Date(changes.end) : copy.end,
            changes.bgColor ?? copy.bgColor,
            changes.user ?? copy.user,
            changes._id ?? copy._id
        );
    }

    toUpdateObject(): Pick<EventsEntity, 'title' | 'notes' | 'start' | 'end' | 'bgColor'> {
        return {
            title: this.title,
            notes: this.notes,
            start: this.start,
            end: this.end,
            bgColor: this.bgColor,
        };
    }
}