const { generateUsers } = require('../services/mocking.service');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const getMockingPets = (req, res) => {
    const pets = [
        { name: 'Firulais', type: 'dog' },
        { name: 'Michi', type: 'cat' }
    ];
    res.json(pets);
};

const getMockingUsers = (req, res) => {
    const users = generateUsers(50);
    res.json(users);
};

const postGenerateData = async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets || users <= 0 || pets <= 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const generatedUsers = generateUsers(users);

        const savedUsers = await User.insertMany(generatedUsers);

        const generatedPets = Array.from({ length: pets }, (_, i) => ({
            name: `Pet${i + 1}`,
            type: i % 2 === 0 ? 'dog' : 'cat',
            owner: savedUsers[i % savedUsers.length]._id 
        }));

        const savedPets = await Pet.insertMany(generatedPets);

        res.status(201).json({
            message: 'Data generated successfully',
            users: savedUsers,
            pets: savedPets
        });
    } catch (error) {
        console.error('Error generating data:', error);
        res.status(500).json({ error: 'Failed to generate data' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
const getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ error: 'Failed to fetch pets' });
    }
};

module.exports = {
    getMockingPets,
    getMockingUsers,
    postGenerateData,
    getUsers,
    getPets
};