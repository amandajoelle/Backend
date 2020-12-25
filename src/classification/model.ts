import { Classification } from '../data_models/model';
import { Model, Op, where } from 'sequelize';
import { Classification as Class } from '../types/classification';

/**
 * Finds and returns a classification object with the specified id
 * or null if it is not found
 * @param classificationId
 * @returns Promise<Model | null>
 */
const getClassification = (classificationId: string): Promise<Model | null> => {
    return Classification.findByPk(classificationId);
};

/**
 * Creates a new classification object and returns it
 * @param classification, the data of the classification
 * @returns Promise<Model>
 */
const createClassification = (classification: Class): Promise<Model> => {
    if (classification.classId || classification.classId === undefined) { delete classification.classId; }
    return Classification.create({
        ...classification
    });
};

/**
 * Updates a classification object at the specified fields
 * @param classificationId, the Id of the classification object. Id must be a string
 * @param classification, the data of the classification
 * @param fields, the fields that should be updated
 * @returns Promise<[number, Model[]]>
 */
const updateClassification = (classificationId: string, classification: Class, fields: string[]): Promise<[number, Model[]]> => {
    return Classification.update(
        { ...classification },
        {
            where: { class_id: classificationId },
            fields
        }
    );
};

export {
    getClassification,
    createClassification,
    updateClassification
};
