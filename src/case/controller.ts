import * as jsonXml from 'jsontoxml';
import {
    getAllDoneCases,
    getAllUndoneCases,
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

const listUndoneAction = (request, response): void => {
    // TODO: change request.params.id to request.user.id when jwt is done
    const userId = Number(request.params.id);
    getAllUndoneCases(userId).then(
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
    const caseId = Number(request.params.id);
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
    const caseId = Number(request.params.id);
    const medicalCase = {};
};

export {
    listDoneAction,
    listUndoneAction,
    oneCaseAction
};
