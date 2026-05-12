const request = require('supertest');
const app = require('../app');

describe('Phonebook API', () => {
    test('persons are returned as json', async () => {
        await request(app)
            .get('/api/persons')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});