import * as request from 'supertest';
import { createServer } from '../src/server';
import { createClassification } from '../src/classification/model';
import { Classification } from '../src/data_models/model';
import { truncate } from './truncate';

const app = createServer();

describe('classification', () => {
    const classificationPost = {
        category: 'Schlimm',
        caseId: '1'
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

    beforeEach(async () => {
        await truncate(Classification);
    })

    it('should insert a classification into the database', async () => {
        const response = await request(app)
            .post('/cirs_classification/')
            .auth(token, { type: "bearer" })
            .send(classificationPost)
            .set('Accept', 'application/json')
            .set('Conent-Type', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ class_id: expect.any(String) });
    })

    it('should fail to insert a classification because no token is set', async () => {
        const response = await request(app)
            .post('/cirs_classification/')
            .send(classificationPost)
            .set('Accept', 'application/json')
            .set('Conent-Type', 'application/json');
        expect(response.status).toBe(401);
    })

    it('should update a classification object in the database', async () => {
        const classification = await createClassification(classificationPost);
        const response = await request(app)
            .put('/cirs_classification/' + classification['class_id'])
            .auth(token, { type: "bearer" })
            .send({ category: 'Nicht so schlimm' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([1]);
    })

    it('should fail to update a classification object because no token is set', async () => {
        const classification = await createClassification(classificationPost);
        const response = await request(app)
            .put('/cirs_classification/' + classification['class_id'])
            .send({ category: 'Nicht so schlimm' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(401);
    })

    it('should get the classification of a given id', async () => {
        const classification = await createClassification(classificationPost);
        const response = await request(app)
            .get('/classification/' + classification['class_id'])
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ...classification['dataValues'] });
    })

    afterAll(() => {
        app.close();
    })
});
