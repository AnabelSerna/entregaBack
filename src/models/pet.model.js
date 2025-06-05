const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre de la mascota es obligatorio'] 
    },
    type: { 
        type: String, 
        required: [true, 'El tipo de mascota es obligatorio'], 
        enum: {
            values: ['dog', 'cat'],
            message: 'El tipo de mascota debe ser "dog" o "cat"'
        }
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'El propietario de la mascota es obligatorio']
    }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);