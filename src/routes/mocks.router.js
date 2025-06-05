const express = require('express');
const {
    getMockingPets,
    getMockingUsers,
    postGenerateData,
    getUsers,
    getPets
} = require('../controllers/mocks.controller');

const router = express.Router();

/**
 * @route GET /api/mocks/mockingpets
 * @description Obtener mascotas simuladas
 */
router.get('/mockingpets', getMockingPets);

/**
 * @route GET /api/mocks/mockingusers
 * @description Obtener usuarios simulados
 */
router.get('/mockingusers', getMockingUsers);

/**
 * @route POST /api/mocks/generateData
 * @description Generar usuarios y mascotas simulados y guardarlos en la base de datos
 */
router.post('/generateData', postGenerateData);

/**
 * @route GET /api/mocks/users
 * @description Obtener todos los usuarios de la base de datos
 */
router.get('/users', getUsers);

/**
 * @route GET /api/mocks/pets
 * @description Obtener todas las mascotas de la base de datos
 */
router.get('/pets', getPets);

module.exports = router;