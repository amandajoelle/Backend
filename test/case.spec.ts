import * as request from 'supertest';
import { createServer } from '../src/server';
import { createCase } from '../src/case/model';
import { truncate } from './truncate';
import { Case } from '../src/data_models/model';

const app = createServer();

describe('medical_case', () => {
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

    beforeEach(async () => {
        await truncate(Case);
    })

    it('should show no done cases', async () => {
        const response = await request(app)
            .get('/case/done/')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    })

    it('should show no incomplete cases', async () => {
        const response = await request(app)
            .get('/medical_case/incomplete/')
            .auth(token, { type: "bearer" })
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    })

    it('should fail to fetch incomplete cases because no token is set', async () => {
        const response = await request(app)
            .get('/medical_case/incomplete/')
            .set('Accept', 'application/json');
        expect(response.status).toBe(401);
    })

    it('should update a case', async () => {
        const medicalCase = await createCase({ status: 'unbearbeitet' });
        const response = await request(app)
            .put('/medical_case/' + medicalCase['case_id'])
            .auth(token, { type: "bearer" })
            .send({ title: 'New Title' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([1]);
    })

    it('should fail to update a case because no token is set', async () => {
        const medicalCase = await createCase({ status: 'unbearbeitet' });
        const response = await request(app)
            .put('/medical_case/' + medicalCase['case_id'])
            .send({ title: 'New failed Title' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(401);
    })

    afterAll(() => {
        app.close();
    })
});
