import { Factor, Feedback } from '../data_models/model';
import { Op } from 'sequelize';
import { Feedback as FeedbackInterface } from '../types/feedback';

const getFeedback = (feedbackId: string) => {
    return Feedback.findByPk(feedbackId, { include: { model: Factor } });
};

const createFeedback = (feedback: FeedbackInterface) => {
    if (feedback.feedbackId || feedback.feedbackId === undefined) { delete feedback.feedbackId; }
    return Feedback.create({
        ...feedback
    });
};

const updateFeedback = (feedbackId: string, feedback: FeedbackInterface, fields: string[]) => {
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
