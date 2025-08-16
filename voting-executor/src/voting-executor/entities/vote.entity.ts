import { Schema } from 'mongoose';

export const VoteSchema = new Schema({
    option: { required: true, type: String },
    category: { required: true, type: String },
}).index({ category: 1, option: 1 });

