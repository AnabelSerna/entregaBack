const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    pets: { type: Array, default: [] }
});

module.exports = mongoose.model('User', userSchema);