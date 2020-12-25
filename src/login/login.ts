import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import { generateSHA512Hash } from '../cryptography/cryptography';
import { getEmployeeByEmailAndPassword } from '../employee/model';
import { TOKEN_SECRET } from '../config/env.config';

/**
 * Login router which doesn't need a token
 */
const authRouter = new Router();

/**
 * Function to resolve a query login a employee and send a jwt token
 */
authRouter.post('/', (request, response): void => {
    const email = request.body.email;
    const password = generateSHA512Hash(request.body.password);
    getEmployeeByEmailAndPassword(email, password).then(
        employee => {
            if (employee) {
                const employeeId = employee['employee_id'];
                const token = sign(employeeId, TOKEN_SECRET);
                response.send({ token });
            } else {
                response.status(401).json('unauthorized');
            }
        },
        error => response.status(401).json('unauthorized')
    );
});

export {
    authRouter
};
