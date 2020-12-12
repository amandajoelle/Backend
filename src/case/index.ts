import { Router } from 'express';
import {
    listDoneAction,
    listUndoneAction,
    oneCaseAction
} from './controller';

const caseRouter = new Router();

caseRouter.get('/done/', listDoneAction);
// TODO: remove :id from undone
caseRouter.get('/undone/:id', listUndoneAction);
caseRouter.get('/:id', oneCaseAction);

export { caseRouter };
