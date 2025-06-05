const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.DB_CONNECTION_STRING) {
            throw new Error('DB_CONNECTION_STRING no está definida en las variables de entorno');
        }

        console.log('Intentando conectar a MongoDB...');
        console.log('Cadena de conexión:', process.env.DB_CONNECTION_STRING);

        await mongoose.connect(process.env.DB_CONNECTION_STRING);

        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;