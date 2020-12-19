import { Classification } from '../data_models/model';
import {Op, where} from 'sequelize';
import { Classification as Class } from '../types/classification';

const getClassification = (classificationId: string) => {
    return Classification.findByPk(classificationId);
};

const createClassification = (classification: Class) => {
    if (classification.classId || classification.classId === undefined) { delete classification.classId; }
    return Classification.create({
        ...classification
    });
};

const updateClassification = (classificationId: string, classification: Class, fields: string[]) => {
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
