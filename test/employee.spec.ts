import * as request from 'supertest';
import { app } from '../src';

describe('employee', () => {
    it('should login successfully', async () => {
        const response = await request(app)
            .post('/login/')
            .send({
                email: 'Mueller@cirs.de',
                password: '123456789'
            })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body).toMatchObject({ token: expect.any(String) });
    })

    it('should fail to login', () => {
        request(app)
            .post('/login/')
            .set('Accept', 'application/json')
            .expect(404);
    })
});
