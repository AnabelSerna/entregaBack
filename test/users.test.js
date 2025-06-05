const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('Users API', () => {
    describe('GET /api/mocks/users', () => {
        it('Debería devolver un array de usuarios con código 200', async () => {
            const res = await request(app).get('/api/mocks/users');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            if (res.body.length > 0) {
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0]).to.have.property('email');
                expect(res.body[0]).to.have.property('role');
            }
        });

        it('Debería manejar errores internos del servidor', async () => {
            const res = await request(app).get('/api/mocks/users');
            expect(res.status).to.not.equal(500);
        });
    });

    describe('POST /api/mocks/generateData', () => {
        it('Debería generar usuarios y mascotas con código 201', async () => {
            const res = await request(app)
                .post('/api/mocks/generateData')
                .send({ users: 5, pets: 3 });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message', 'Data generated successfully');
            expect(res.body).to.have.property('users').that.is.an('array');
            expect(res.body).to.have.property('pets').that.is.an('array');
        });

        it('Debería manejar entradas inválidas con código 400', async () => {
            const res = await request(app)
                .post('/api/mocks/generateData')
                .send({ users: 0, pets: 0 });
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error', 'Invalid input data');
        });

        it('Debería manejar errores internos del servidor', async () => {
            const res = await request(app)
                .post('/api/mocks/generateData')
                .send({ users: 5, pets: 3 });
            expect(res.status).to.not.equal(500);
        });
    });
});