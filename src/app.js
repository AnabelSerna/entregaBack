const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Project Mocks. Visita /api-docs para la documentación.');
});

app.get('/api/mocks/users', (req, res) => {
    const users = [
        { _id: '1', name: 'Usuario 1', role: 'admin' },
        { _id: '2', name: 'Usuario 2', role: 'user' },
        { _id: '3', name: 'Usuario 3', role: 'user' }
    ];
    res.json(users);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;