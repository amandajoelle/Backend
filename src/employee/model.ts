import { Employee } from '../data_models/model';
import { Op } from 'sequelize';

const getEmployeeByEmailAndPassword = (email: string, password: string) => {
    return Employee.findOne({ where: { email: email, password: password } });
};

const getEmployeeByEmail = (email: string) => {
    return Employee.findOne({ where: { email: email } });
};

const getEmployeeById = (employeeId: string) => {
    return Employee.findByPk(employeeId);
};

export {
    getEmployeeById,
    getEmployeeByEmail,
    getEmployeeByEmailAndPassword
};
