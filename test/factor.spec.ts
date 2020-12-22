import * as request from 'supertest';
import { createServer } from '../src/server';
import { createFactor } from '../src/factor/model';
import { Factor } from '../src/data_models/model';
import { truncate } from './truncate';

const app = createServer();

describe('factor', () => {
    const factorPost = {
        content: 'Kommunikation (im Team, mit Patienten, mit anderen Ärzten etc.)'
    };

    beforeEach(async () => {
        await truncate(Factor);
    })

    it('should get the factor of a specified id', async () => {
        const factor = await createFactor(factorPost);
        const response = await request(app)
            .get('/factor/' + factor['factor_id'])
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ...factor['dataValues'], feedback: null, questionnaire: null });
    })

    it ('should return null of a not known id', async () => {
        const response = await request(app)
            .get('/factor/1')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toBe(null);
    })

    afterAll(() => {
        app.close();
    })
});
