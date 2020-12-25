import { Employee } from '../data_models/model';
import { Model, Op } from 'sequelize';

/**
 * Finds and returns an employee if email and password match with
 * one object in the database
 * @param email, email address of the employee
 * @param password, password of the employee
 * @returns Promise<Model | null>
 */
const getEmployeeByEmailAndPassword = (email: string, password: string): Promise<Model | null> => {
    return Employee.findOne({ where: { email: email, password: password } });
};

/**
 * Finds and returns an employee by the email address
 * @param email, email address of the employee
 * @returns Promise<Model | null>
 */
const getEmployeeByEmail = (email: string): Promise<Model | null> => {
    return Employee.findOne({ where: { email: email } });
};

/**
 * Finds and returns an employee by the id
 * @param employeeId, id of the employee
 * @returns Promise<Model | null>
 */
const getEmployeeById = (employeeId: string): Promise<Model | null> => {
    return Employee.findByPk(employeeId);
};

export {
    getEmployeeById,
    getEmployeeByEmail,
    getEmployeeByEmailAndPassword
};
