const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    referrerEmail: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);