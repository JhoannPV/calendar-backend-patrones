import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    title:    { type: String, required: true },
    notes:    { type: String },
    // start y end son opcionales a nivel Mongoose; la validación de negocio
    // se hace en el DTO: requeridos solo si NO hay parentId (subevento o independiente con fecha)
    start:    { type: Date, required: false, default: null },
    end:      { type: Date, required: false, default: null },
    bgColor:  { type: String, required: true },
    category: { type: String, enum: ['general', 'work', 'sports', 'family', 'travel'], required: true, default: 'general' },
    user:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Event', default: null }, // COMPOSITE
});

export const EventModel = mongoose.model('Event', eventSchema);