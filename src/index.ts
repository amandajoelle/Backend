import * as express from 'express';
import { json } from 'body-parser';
import * as expressJwt from 'express-jwt';
import { TOKEN_SECRET } from './config/env.config';
import { caseRouter, safeCaseRouter } from './case';
import { authRouter } from './login/login';
import { questionnaireRouter } from "./questionnaire";
import { factorRouter } from './factor';
import { feedbackRouter, safeFeedbackRouter } from './feedback';
import { classificationRouter, safeClassificationRouter } from './classification';

const app = express();

app.use(json());

app.use('/login', authRouter);
app.use('/case', caseRouter);
app.use('/medical_case', expressJwt({ secret: TOKEN_SECRET, algorithms: ['HS256'] }), safeCaseRouter);
app.use('/questionnaire', questionnaireRouter);
app.use('/factor', factorRouter);
app.use('/feedback', feedbackRouter);
app.use('/cirs_feedback', expressJwt({ secret: TOKEN_SECRET, algorithms: ['HS256'] }), safeFeedbackRouter);
app.use('/classification', classificationRouter);
app.use('/cirs_classification', expressJwt({ secret: TOKEN_SECRET, algorithms: ['HS256'] }), safeClassificationRouter);
/* app.use((error, request, response, next) => {
    if (error.name === 'UnauthorizedError') {
        response.status(401).json('unauthorized');
    } else {
        next();
    }
}); */

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});
