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
import { postFactor } from '../factor/model';

const getOneFeedbackAction = (request, response): void => {
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
                .then(c => console.log('Case has been updated'));
            newFactors.forEach(factor => {
                factor.feedback = feedback['feedback_id'];
                postFactor(factor).then(f => console.log('Created new factor'));
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
    getOneFeedbackAction,
    postFeedbackAction,
    updateFeedbackAction
};
