import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    joinedEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema); 