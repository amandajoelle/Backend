import { Router } from 'express';
import {
    getClassificationAction,
    postClassificationAction,
    putClassificationAction
} from './controller';

const classificationRouter = new Router();
const safeClassificationRouter = new Router();

classificationRouter.get('/:id', getClassificationAction);

safeClassificationRouter.post('/', postClassificationAction);
safeClassificationRouter.put('/:id', putClassificationAction);

export {
    classificationRouter,
    safeClassificationRouter
};
