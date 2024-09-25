import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {type: String, required: 'Enter a first name'},
    lastName: {type: String, required: 'enter a last name'},
    email: String,
    company: String,
    phone: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});
