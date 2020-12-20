import * as request from 'supertest';
import { createServer } from '../src/server';

const app = createServer();

describe('factor', () => {
    // TODO: write tests

    afterAll(() => {
        app.close();
    })
});
