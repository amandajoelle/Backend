import { Router } from 'express';
import {
    getClassificationAction,
    postClassificationAction,
    putClassificationAction
} from './controller';

/**
 * Classification router which doesn't need a token
 */
const classificationRouter = new Router();
/**
 * Classification router which needs a token (jwt)
 */
const safeClassificationRouter = new Router();

classificationRouter.get('/:id', getClassificationAction);

safeClassificationRouter.post('/', postClassificationAction);
safeClassificationRouter.put('/:id', putClassificationAction);

export {
    classificationRouter,
    safeClassificationRouter
};
