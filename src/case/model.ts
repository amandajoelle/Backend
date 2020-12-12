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

export {
    getAllDoneCases,
    getAllUndoneCases,
    getCase
};
