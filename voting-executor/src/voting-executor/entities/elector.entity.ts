import { Schema } from 'mongoose';

export const ElectorSchema = new Schema({
    email: { required: true, type: String },
    category: { required: true, type: String },
}).index({ category: 1, email: 1 });

