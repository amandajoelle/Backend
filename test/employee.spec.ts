import * as request from 'supertest';
import { createServer } from '../src/server';

const app = createServer();

describe('employee', () => {
    it('should login successfully', async () => {
        const response = await request(app)
            .post('/login/')
            .send({
                email: 'Mueller@cirs.de',
                password: '123456789'
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ token: expect.any(String) });
    })

    it('should fail to login', async () => {
        const response = await request(app)
            .post('/login/')
            .set('Accept', 'application/json');
        expect(response.status).toBe(404);
    })

    afterAll(() => {
        app.close();
    })
});
