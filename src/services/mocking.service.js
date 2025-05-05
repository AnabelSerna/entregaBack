const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const generateUsers = async (num) => {
    const users = [];
    const hashedPassword = await bcrypt.hash('coder123', 10); 

    for (let i = 0; i < num; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: Math.random() < 0.5 ? 'user' : 'admin', 
            pets: []
        });
    }

    return users;
};

const generatePets = (num, users) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        pets.push({
            name: `Pet${i + 1}`,
            type: i % 2 === 0 ? 'dog' : 'cat',
            owner: users[i % users.length]._id
        });
    }
    return pets;
};

const generateData = async (userCount, petCount) => {
    try {
        const users = await generateUsers(userCount);
        const savedUsers = await User.insertMany(users);

        const pets = generatePets(petCount, savedUsers);
        await Pet.insertMany(pets);

        console.log('Data generated successfully');
    } catch (error) {
        console.error('Error generating data:', error);
    }
};

module.exports = { generateUsers, generateData };