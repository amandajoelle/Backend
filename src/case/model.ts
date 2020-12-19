import { Case } from '../data_models/model';
import { Op } from 'sequelize';
import { UpdateMedicalCase } from '../types/medical_case';


const getAllDoneCases = () => {
    return Case.findAll({
        where: { status: 'erledigt' }
    });
};

const getAllIncompleteCases = (userId: string) => {
    return Case.findAll({
        where: {
            [Op.or]: [{ editor: null }, { editor: userId }]
        }
    })
};

const getCase = (caseId: string) => {
    return Case.findByPk(caseId);
};

const updateCase = (caseId: string, medicalCase: UpdateMedicalCase, fields: string[]) => {
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

const deleteCase = (caseId: string) => {
    return Case.destroy(
        {
            where: {
                case_id: caseId
            }
        }
    );
};

const createCase = (medicalCase) => {
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
