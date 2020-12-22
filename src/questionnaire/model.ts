import { Factor, Questionnaire } from '../data_models/model';
import { Op } from 'sequelize';
import { Questionnaire as Q } from '../types/questionnaire';

const getQuestionnaire = (questionnaireId: string) => {
    return Questionnaire.findByPk(questionnaireId, { include: { model: Factor} });
};

const createQuestionnaire = (questionnaire: Q) => {
    if (questionnaire.questionId || questionnaire.questionId === undefined) { delete questionnaire.questionId; }
    return Questionnaire.create(
        {
            ...questionnaire,
            age_group: questionnaire.ageGroup
        }
    );
};

export {
    getQuestionnaire,
    createQuestionnaire
};
