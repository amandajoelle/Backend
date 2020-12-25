import { Factor, Feedback } from '../data_models/model';
import { Model, Op } from 'sequelize';
import { Feedback as FeedbackInterface } from '../types/feedback';

/**
 * Finds and returns a specified feedback by id
 * @param feedbackId, id of the feedback object. Id must be a string
 * @returns Promise<Model | null>
 */
const getFeedback = (feedbackId: string): Promise<Model | null> => {
    return Feedback.findByPk(feedbackId, { include: { model: Factor } });
};

/**
 * Creates a new feedback object and returns it
 * @param feedback, the data of the feedback object
 * @returns Promise<Model>
 */
const createFeedback = (feedback: FeedbackInterface): Promise<Model> => {
    if (feedback.feedbackId || feedback.feedbackId === undefined) { delete feedback.feedbackId; }
    return Feedback.create({
        ...feedback
    });
};

/**
 * Updates a feedback object at the specified fields
 * @param feedbackId, the id of the feedback object. Id must be a string
 * @param feedback, the data of the feedback object
 * @param fields, the fields that should be updated
 * @returns Promise<[number, Model[]]>
 */
const updateFeedback = (feedbackId: string, feedback: FeedbackInterface, fields: string[]): Promise<[number, Model[]]> => {
    return Feedback.update(
        {
            ...feedback
        },
        {
            where:
                {
                    feedback_id: feedbackId
                },
            fields
        });
};

export {
    getFeedback,
    createFeedback,
    updateFeedback
};
