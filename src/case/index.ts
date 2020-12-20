import { Router } from 'express';
import {
    listDoneAction,
    listIncompleteAction,
    oneCaseAction,
    updateCaseAction
} from './controller';

const caseRouter = new Router();
const safeCaseRouter = new Router();

caseRouter.get('/done/', listDoneAction);
caseRouter.get('/:id', oneCaseAction);

safeCaseRouter.get('/incomplete/', listIncompleteAction);
safeCaseRouter.put('/:id', updateCaseAction);

export {
    caseRouter,
    safeCaseRouter
};
