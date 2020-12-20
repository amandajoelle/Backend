import * as request from 'supertest';
import { createServer } from '../src/server';

const app = createServer();

describe('medical_case', () => {
    it('should show no done cases', async () => {
        const response = await request(app).get('/case/done/')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expect.arrayContaining([]) );
    })

    afterAll(() => {
        app.close();
    })
});
