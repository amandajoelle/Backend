import { Router } from 'express';
import {
    getQuestionnaireAction,
    postQuestionnaireAction
} from './controller';

/**
 * Questionnaire router which doesn't need a token
 */
const questionnaireRouter = new Router();

questionnaireRouter.get('/:id', getQuestionnaireAction);
questionnaireRouter.post('/', postQuestionnaireAction);

export { questionnaireRouter };
