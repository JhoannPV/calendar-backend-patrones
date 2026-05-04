import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    title:    { type: String, required: true },
    notes:    { type: String },
    start:    { type: Date, required: true },
    end:      { type: Date, required: true },
    bgColor:  { type: String, required: true },
    category: { type: String, enum: ['general', 'work', 'sports', 'family', 'travel'], required: true, default: 'general' },
    user:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Event', default: null }, // COMPOSITE
});

export const EventModel = mongoose.model('Event', eventSchema);