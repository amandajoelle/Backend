import { Router} from 'express';
import {
    getFeedbackAction,
    postFeedbackAction,
    updateFeedbackAction
} from './controller';

/**
 * Feedback router which doesn't need a token
 */
const feedbackRouter = new Router();
/**
 * Feedback router which needs a token (jwt) to pass
 */
const safeFeedbackRouter = new Router();

feedbackRouter.get('/:id', getFeedbackAction);

safeFeedbackRouter.post('/', postFeedbackAction);
safeFeedbackRouter.put('/:id', updateFeedbackAction);

export {
    feedbackRouter,
    safeFeedbackRouter
};
