import { Router } from 'express';
import {
    getOneQuestionnaireAction,
    createQuestionnaireAction
} from './controller';

const questionnaireRouter = new Router();

questionnaireRouter.get('/:id', getOneQuestionnaireAction);
questionnaireRouter.post('/', createQuestionnaireAction);

export { questionnaireRouter };
