import { Questionnaire } from '../data_models/model';
import { Op } from 'sequelize';

const getQuestionnaire = (questionnaireId: string) => {
    return Questionnaire.findByPk(questionnaireId);
};

const postQuestionnaire = (questionnaire) => {
    if (questionnaire.questionId || questionnaire.questionId === undefined) { delete questionnaire.questionId; }
    return Questionnaire.create(
        {
            ...questionnaire
        }
    );
};

export {
    getQuestionnaire,
    postQuestionnaire
};
