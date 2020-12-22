import { Router } from 'express';
import {
    listDoneAction,
    listIncompleteAction,
    getCaseAction,
    updateCaseAction
} from './controller';

const caseRouter = new Router();
const safeCaseRouter = new Router();

caseRouter.get('/done/', listDoneAction);
caseRouter.get('/:id', getCaseAction);

safeCaseRouter.get('/incomplete/', listIncompleteAction);
safeCaseRouter.put('/:id', updateCaseAction);

export {
    caseRouter,
    safeCaseRouter
};
