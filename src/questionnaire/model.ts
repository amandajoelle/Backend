import { Factor, Questionnaire } from '../data_models/model';
import { Model, Op } from 'sequelize';
import { Questionnaire as Q } from '../types/questionnaire';

/**
 * Finds and returns a specified questionnaire by id
 * @param questionnaireId, the id of the questionnaire. Id must be a string
 * @returns Promise<Model | null>
 */
const getQuestionnaire = (questionnaireId: string): Promise<Model | null> => {
    return Questionnaire.findByPk(questionnaireId, { include: { model: Factor} });
};

/**
 * Creates a new questionnaire and returns it
 * @param questionnaire, the data of the questionnaire
 * @returns Promise<Model>
 */
const createQuestionnaire = (questionnaire: Q): Promise<Model> => {
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
