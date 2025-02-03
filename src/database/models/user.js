const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: { type: String, required: true },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
});

module.exports = model('User', userSchema);
