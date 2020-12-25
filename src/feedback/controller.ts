import * as jsonXml from 'jsontoxml';
import {
    getFeedback,
    createFeedback,
    updateFeedback
} from './model';
import { factorsFactory, feedbackFactory } from '../helper/factory';
import { Feedback } from '../types/feedback';
import { Factor } from '../types/factor';
import { updateCase } from '../case/model';
import { createFactor } from '../factor/model';

/**
 * Function to resolve a query for a specified feedback
 * @param request, the express request property
 * @param response, the express response property
 */
const getFeedbackAction = (request, response): void => {
    const feedbackId = request.params.id;
    getFeedback(feedbackId).then(
        feedback => {
            response.format({
                xml() {
                    response.send(jsonXml({ feedback }));
                },
                json() {
                    response.json(feedback);
                },
                default() {
                    response.json(feedback);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

/**
 * Function to resolve a query to create a new feedback
 * @param request, the express request property
 * @param response, the express response property
 */
const postFeedbackAction = (request, response): void => {
    const userId = request.user;
    const caseId = request.body.caseId;
    const newFeedback: Feedback = feedbackFactory(request);
    const newFactors: Factor[] = factorsFactory(request);

    createFeedback(newFeedback).then(
        feedback => {
            updateCase(
                caseId,
                { feedback: feedback['feedback_id'], editor: userId },
                ['feedback', 'editor'])
                .then(c => c);
            newFactors.forEach(factor => {
                factor.feedback = feedback['feedback_id'];
                createFactor(factor).then(f => f);
            });
            response.format({
                xml() {
                    response.send(jsonXml({ feedback }));
                },
                json() {
                    response.json(feedback);
                },
                default() {
                    response.json(feedback);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

/**
 * Function to resolve a query to update a specified feedback object
 * @param request, the express request property
 * @param response, the express response property
 */
const updateFeedbackAction = (request, response): void => {
    const userId = request.user;
    const feedbackId = request.params.id;
    const feedbackUpdate = feedbackFactory(request);

    updateFeedback(feedbackId, feedbackUpdate, Object.keys(feedbackUpdate)).then(
        feedback => {
            response.format({
                xml() {
                    response.send(jsonXml({ feedback }));
                },
                json() {
                    response.json(feedback);
                },
                default() {
                    response.json(feedback);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

export {
    getFeedbackAction,
    postFeedbackAction,
    updateFeedbackAction
};
