const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'], 
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: { 
        type: String, 
        enum: {
            values: ['user', 'admin'],
            message: 'El rol debe ser "user" o "admin"'
        },
        required: [true, 'El rol es obligatorio']
    },
    pets: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], 
        default: [] 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);