import { Router } from 'express';
import {
    listFactorsOfFeedback,
    listFactorsOfQuestionnaire,
    fetchFactor
} from './controller';

const factorRouter = new Router();

factorRouter.get('/feedback/:id', listFactorsOfFeedback);
factorRouter.get('/questionnaire/:id', listFactorsOfQuestionnaire);
factorRouter.get('/:id', fetchFactor);

export { factorRouter };
