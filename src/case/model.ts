import { Case } from '../data_models/model';
import { Op } from 'sequelize';


const getAllDoneCases = () => {
    return Case.findAll({
        where: { status: 'erledigt' }
    });
};

const getAllUndoneCases = (userId: number) => {
    return Case.findAll({
        where: {
            [Op.or]: [{ editor: null }, { editor: userId }]
        }
    })
};

const getCase = (case_id: number) => {
    return Case.findByPk(case_id);
};

const updateCase = (caseId: number, medical_case) => {
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

const deleteCase = (caseId: number) => {
    return Case.destroy(
        {
            where: {
                case_id: caseId
            }
        }
    );
};

const createCase = (medicalCase) => {
    return Case.create(
        {
            ...medicalCase
        }
    );
};

export {
    getAllDoneCases,
    getAllUndoneCases,
    getCase,
    updateCase,
    deleteCase,
    createCase
};
