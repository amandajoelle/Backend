import * as request from 'supertest';
import { createServer } from '../src/server';

const app = createServer();

describe('classification', () => {
    const classification = {
        category: "Schlimm",
        caseId: "1"
    };
    let token: string;

    beforeAll(async () => {
        const response = await request(app)
            .post('/login/')
            .send({
                email: 'Mueller@cirs.de',
                password: '123456789'
            })
            .set('Accept', 'application/json');
        token = response.body['token'];
    })

    it('should insert a classification into the database', async () => {
        const response = await request(app)
            .post('/cirs_classification/')
            .auth(token, { type: "bearer" })
            .send(classification)
            .set('Accept', 'application/json')
            .set('Conent-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ class_id: expect.any(String) });
    })

    afterAll(() => {
        app.close();
    })
});
