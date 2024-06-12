import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const TaskModel = mongoose.model('Task', TaskSchema);
