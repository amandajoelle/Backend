import { Router } from 'express';
import {
    listDoneAction,
    listIncompleteAction,
    getCaseAction,
    updateCaseAction
} from './controller';

/**
 * Medical case router which doesn't need a token
 */
const caseRouter = new Router();
/**
 * Medical case router which needs a token (jwt) to pass
 */
const safeCaseRouter = new Router();

caseRouter.get('/done/', listDoneAction);
caseRouter.get('/:id', getCaseAction);

safeCaseRouter.get('/incomplete/', listIncompleteAction);
safeCaseRouter.put('/:id', updateCaseAction);

export {
    caseRouter,
    safeCaseRouter
};
