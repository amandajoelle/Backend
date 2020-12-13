import * as jsonXml from 'jsontoxml';
import {
    getAllDoneCases,
    getAllIncompleteCases,
    getCase,
    updateCase
} from './model';

const listDoneAction = (request, response): void => {
    getAllDoneCases().then(
        cases => {
            response.format({
                xml() {
                    response.send(jsonXml(cases.map(c => ({ c }))));
                },
                json() {
                    response.json(cases);
                },
                default() {
                    response.json(cases);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

const listIncompleteAction = (request, response): void => {
    const userId = request.user;
    getAllIncompleteCases(userId).then(
        cases => {
            response.format({
                xml() {
                    response.send(jsonXml(cases.map(c => ({ c }))));
                },
                json() {
                    response.json(cases);
                },
                default() {
                    response.json(cases);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

const oneCaseAction = (request, response) => {
    const caseId = request.params.id;
    getCase(caseId).then(
        c => {
            response.format({
                xml() {
                    response.send(jsonXml(c));
                },
                json() {
                    response.json(c);
                },
                default() {
                    response.json(c);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

const updateCaseAction =(request, response) => {
    const caseId = request.params.id;
    const medicalCase = {};
};

export {
    listDoneAction,
    listIncompleteAction,
    oneCaseAction
};
