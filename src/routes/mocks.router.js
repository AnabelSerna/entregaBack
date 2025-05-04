const express = require('express');
const {
    getMockingPets,
    getMockingUsers,
    postGenerateData,
    getUsers,
    getPets
} = require('../controllers/mocks.controller');

const router = express.Router();

router.get('/mockingpets', getMockingPets);

router.get('/mockingusers', getMockingUsers);

router.post('/generateData', postGenerateData);

router.get('/users', getUsers);

router.get('/pets', getPets);

module.exports = router;