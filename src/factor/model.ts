import { Factor } from '../data_models/model';
import { Model, Op } from 'sequelize';
import { Factor as F } from '../types/factor';

/**
 * Finds and returns a factor by the specified id
 * @param factorId, id of the factor. Id must be a string
 * @returns Promise<Model | null>
 */
const getFactor = (factorId: string): Promise<Model | null> => {
    return Factor.findByPk(factorId);
};

/**
 * Finds and returns all factors of a specified questionnaire
 * @param questionnaireId, id of a questionnaire. Id must be a string
 * @returns Promise<Model[]>
 */
const getFactorsOfQuestionnaire = (questionnaireId: string): Promise<Model[]> => {
    return Factor.findAll({
        where: { questionnaire: questionnaireId }
    });
};

/**
 * Finds and returns all factors of a specified feedback
 * @param feedbackId, id of feedback. Id must be a string
 * @returns Promise<Model[]>
 */
const getFactorsOfFeedback = (feedbackId: string): Promise<Model[]> => {
    return Factor.findAll({
        where: { feedback: feedbackId }
    });
};

/**
 * Creates a new factor and returns it
 * @param factor, the data of the factor
 * @returns Promise<Model>
 */
const createFactor = (factor: F): Promise<Model> => {
    if (factor.factorId || factor.factorId === undefined) { delete factor.factorId; }
    return Factor.create({ ...factor });
};

/**
 * Updates a factor object at the specified fields
 * @param factorId, the id of the factor object. Id must be a string
 * @param factor, the data of the factor object
 * @param fields, the fields that should be updated
 * @returns Promise<Model>
 */
const updateFactor = (factorId: string, factor: F, fields: string[]): Promise<[number, Model[]]> => {
    return Factor.update(
        {
            ...factor
        },
        {
            where: {
                factor_id: factorId
            },
            fields
        }
    );
};

export {
    getFactor,
    getFactorsOfFeedback,
    getFactorsOfQuestionnaire,
    createFactor,
    updateFactor
};
