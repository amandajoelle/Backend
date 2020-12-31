import { Router } from 'express';
import {
    listFactorsOfFeedbackAction,
    listFactorsOfQuestionnaireAction,
    getFactorAction,
    updateFactorAction
} from './controller';

/**
 * Factor router which doesn't need a token
 */
const factorRouter = new Router();

factorRouter.get('/feedback/:id', listFactorsOfFeedbackAction);
factorRouter.get('/questionnaire/:id', listFactorsOfQuestionnaireAction);
factorRouter.get('/:id', getFactorAction);
factorRouter.put('/:id', updateFactorAction);

export { factorRouter };
