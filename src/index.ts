import * as express from 'express';
import { json } from 'body-parser';
import { caseRouter } from './case';

const app = express();

app.use(json());

app.use('/case', caseRouter);

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});
