import { Case } from '../data_models/model';
import { Op } from 'sequelize';


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

const updateCase = (caseId: string, medical_case) => {
    return Case.update(
        {
            ...medical_case
        },
        {
            where: {
                case_id: caseId
            }
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
