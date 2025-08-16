import { Schema } from 'mongoose';

export const VoteSchema = new Schema({
    name: { required: true, type: String },
    category: { required: true, type: String },
    createdAt: { required: true, type: Date }
}).index({ category: 1, option: 1 });

