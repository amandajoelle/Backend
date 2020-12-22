import { Case } from '../data_models/model';
import { Model, Op } from 'sequelize';
import { MedicalCase, UpdateMedicalCase } from '../types/medical_case';

/**
 * Finds and returns all medical cases that have the
 * status 'erledigt'
 * @return Promise<Model[]>
 */
const getAllDoneCases = (): Promise<Model[]> => {
    return Case.findAll({
        where: { status: 'erledigt' }
    });
};

/**
 * Finds and returns all medical cases that have
 * no editor or is edited by the user | employee
 * @param userId, the id of the user | employee. Id must be a string
 * @return Promise<Model[]>
 */
const getAllIncompleteCases = (userId: string): Promise<Model[]> => {
    return Case.findAll({
        where: {
            [Op.or]: [{ editor: null }, { editor: userId }]
        }
    })
};

/**
 * Finds and returns the medical case the specified id
 * @param caseId, the id of the case. Id must be a string
 * @return Promise<Model | null>
 */
const getCase = (caseId: string): Promise<Model | null> => {
    return Case.findByPk(caseId);
};

/**
 * Updates a medical case at the specified fields
 * @param caseId, the id of the case. Id must be a string
 * @param medicalCase, the data of the medical case
 * @param fields, the fields that should be updated
 * @return Promise<Model[]>
 */
const updateCase = (caseId: string, medicalCase: UpdateMedicalCase, fields: string[]): Promise<[number, Model[]]> => {
    return Case.update(
        {
            ...medicalCase
        },
        {
            where: {
                case_id: caseId
            },
            fields
        }
    );
};

/**
 * Deletes a specified medical case
 * @param caseId, the id of the case. Id must be a string
 * @return Promise<number>
 */
const deleteCase = (caseId: string): Promise<number> => {
    return Case.destroy(
        {
            where: {
                case_id: caseId
            }
        }
    );
};

/**
 * Creates a new medical case and returns it
 * @param medicalCase, the data of the medical case
 * @return Promise<Model>
 */
const createCase = (medicalCase: MedicalCase): Promise<Model> => {
    if (medicalCase.caseId || medicalCase.caseId === undefined) { delete medicalCase.caseId; }
    return Case.create(
        {
            ...medicalCase
        }
    );
};

export {
    getAllDoneCases,
    getAllIncompleteCases,
    getCase,
    updateCase,
    deleteCase,
    createCase
};
