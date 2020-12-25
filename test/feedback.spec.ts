import * as request from 'supertest';
import { createServer } from '../src/server';
import { createFeedback } from '../src/feedback/model';
import { Feedback } from '../src/data_models/model';
import { truncate } from './truncate';

const app = createServer();

describe('feedback', () => {
    const feedbackPost = {
        comment:"War nicht so gut",
        solution:"Einfach besser machen",
        caseId:"1",
        factors: []
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
        await truncate(Feedback);
    })

    it('should insert feedback, with factors, into the database', async () => {
        const response = await request(app)
            .post('/cirs_feedback/')
            .send(feedbackPost)
            .auth(token, { type: "bearer" })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ feedback_id: expect.any(String) });
    })

    it('should fail to insert feedback because no token is set', async () => {
        const response = await request(app)
            .post('/cirs_feedback/')
            .send(feedbackPost)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(401);
    })

    it('should update feedback', async () => {
        const feedback = await createFeedback(feedbackPost);
        const response = await request(app)
            .put('/cirs_feedback/' + feedback['feedback_id'])
            .auth(token, { type: "bearer" })
            .send({ solution: 'Noch besser machen!' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([1]);
    })

    it('should fail to update feedback because no token is set', async () => {
        const feedback = await createFeedback(feedbackPost);
        const response = await request(app)
            .put('/cirs_feedback/' + feedback['feedback_id'])
            .send({ solution: 'Noch besser machen!' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(401);
    })

    it('should fetch the feedback of a given id', async () => {
        const feedback = await createFeedback(feedbackPost);
        const response = await request(app)
            .get('/feedback/' + feedback['feedback_id'])
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ...feedback['dataValues'], Factors: [] });
    })

    afterAll(() => {
        app.close();
    })
});
