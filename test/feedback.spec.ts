import * as request from 'supertest';
import { createServer } from '../src/server';

const app = createServer();

describe('feedback', () => {
    const feedback = {
        comment:"War nicht so gut",
        solution:"Einfach besser machen",
        caseId:"1",
        factors:[
            {
                content:"Kommunikation (im Team, mit Patienten, mit anderen Ärzten etc.)"
            },
            {
                content:"Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)"
            },
            {
                content:"Patientenfaktoren (Sprache, Einschränkungen, med. Zustand etc.)"
            }
        ]
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

    it('should insert feedback, with factors, into the database', async () => {
        const response = await request(app).post('/cirs_feedback/')
            .send(feedback)
            .auth(token, { type: "bearer" })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ feedback_id: expect.any(String) });
    })

    afterAll(() => {
        app.close();
    })
});
