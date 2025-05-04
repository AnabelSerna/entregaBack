const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const generateUsers = (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        const role = Math.random() < 0.5 ? 'user' : 'admin';
        const password = bcrypt.hashSync('coder123', 10);
        users.push({ password, role, pets: [] });
    }
    return users;
};

const generateData = async (userCount, petCount) => {
    const users = generateUsers(userCount);
    await User.insertMany(users);
    // Lógica para generar y guardar mascotas si es necesario
};

module.exports = { generateUsers, generateData };