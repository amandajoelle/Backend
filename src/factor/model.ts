import { Factor } from '../data_models/model';
import { Op } from 'sequelize';
import { Factor as F } from '../types/factor';

const getFactor = (factorId: string) => {
    return Factor.findByPk(factorId);
};

const getFactorsOfQuestionnaire = (questionnaireId: string) => {
    return Factor.findAll({
        where: { questionnaire: questionnaireId }
    });
};

const getFactorsOfFeedback = (feedbackId: string) => {
    return Factor.findAll({
        where: { feedback: feedbackId }
    });
};

const createFactor = (factor: F) => {
    if (factor.factorId || factor.factorId === undefined) { delete factor.factorId; }
    return Factor.create({ ...factor });
};

export {
    getFactor,
    getFactorsOfFeedback,
    getFactorsOfQuestionnaire,
    createFactor
};
