const express = require('express');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const router = express.Router();

/**
 * @route GET /api/adoption
 * @description Obtener todas las adopciones
 */
router.get('/', async (req, res) => {
    try {
        const adoptions = [];
        res.status(200).json(adoptions);
    } catch (error) {
        console.error('Error al obtener adopciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/**
 * @route POST /api/adoption
 * @description Crear una adopción
 */
router.post('/', async (req, res) => {
    const { userId, petId } = req.body;
    if (!userId || !petId) {
        return res.status(400).json({ error: 'Faltan userId o petId en la solicitud' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.status(201).json({ message: 'Adopción creada exitosamente', user, pet });
    } catch (error) {
        console.error('Error al crear adopción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;