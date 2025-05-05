const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');

// Generar usuarios con datos simulados
const generateUsers = async (num) => {
    const users = [];
    const hashedPassword = await bcrypt.hash('coder123', 10); // Contraseña encriptada

    for (let i = 0; i < num; i++) {
        users.push({
            name: faker.person.fullName(), // Nombre completo (actualizado)
            email: faker.internet.email(), // Email aleatorio
            password: hashedPassword, // Contraseña encriptada
            role: Math.random() < 0.5 ? 'user' : 'admin', // Rol aleatorio
            pets: [] // Lista vacía de mascotas
        });
    }

    return users;
};

// Generar mascotas con datos simulados
const generatePets = (num, users) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        pets.push({
            name: `Pet${i + 1}`, // Nombre de la mascota
            type: i % 2 === 0 ? 'dog' : 'cat', // Alternar entre perro y gato
            owner: users[i % users.length]._id // Asignar dueño de forma cíclica
        });
    }
    return pets;
};

// Generar y guardar datos en la base de datos
const generateData = async (userCount, petCount) => {
    try {
        // Generar usuarios
        const users = await generateUsers(userCount);
        const savedUsers = await User.insertMany(users);

        // Generar mascotas
        const pets = generatePets(petCount, savedUsers);
        await Pet.insertMany(pets);

        console.log('Data generated successfully');
    } catch (error) {
        console.error('Error generating data:', error);
    }
};

module.exports = { generateUsers, generateData };