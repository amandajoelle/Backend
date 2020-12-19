import { Router} from 'express';
import {
    getOneFeedbackAction,
    postFeedbackAction,
    updateFeedbackAction
} from './controller';

const feedbackRouter = new Router();
const safeFeedbackRouter = new Router();

feedbackRouter.get('/:id', getOneFeedbackAction);

safeFeedbackRouter.post('/', postFeedbackAction);
safeFeedbackRouter.put('/:id', updateFeedbackAction);

export {
    feedbackRouter,
    safeFeedbackRouter
};
