import * as jsonXml from 'jsontoxml';
import {
    getAllDoneCases,
    getAllIncompleteCases,
    getCase,
    updateCase
} from './model';
import { caseFactory } from '../helper/factory';

/**
 * Function to resolve a query for all done medical cases
 * @param request, the express request property
 * @param response, the express response property
 */
const listDoneAction = (request, response): void => {
    getAllDoneCases().then(
        cases => {
            response.format({
                xml() {
                    response.send(jsonXml(cases.map(c => ({ ...c }))));
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

/**
 * Function to resolve a query for all incomplete medical cases
 * @param request, the express request property
 * @param response, the express response property
 */
const listIncompleteAction = (request, response): void => {
    const userId = request.user;
    getAllIncompleteCases(userId).then(
        cases => {
            response.format({
                xml() {
                    response.send(jsonXml(cases.map(c => ({ ...c }))));
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

/**
 * Function to resolve a query for an specified medical case
 * @param request, the express request property
 * @param response, the express response property
 */
const getCaseAction = (request, response) => {
    const caseId = request.params.id;
    getCase(caseId).then(
        c => {
            response.format({
                xml() {
                    response.send(jsonXml(c.toJSON()));
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

/**
 * Function to resolve a query to update an specified medical case
 * @param request, the express request property
 * @param response, the express response property
 */
const updateCaseAction =(request, response) => {
    const caseId = request.params.id;
    const userId = request.user;
    const medicalCase = caseFactory(request);
    medicalCase.editor = userId;

    updateCase(caseId, medicalCase, Object.keys(medicalCase)).then(
        c => {
            response.format({
                xml() {
                    response.send(jsonXml(c[0]));
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

export {
    listDoneAction,
    listIncompleteAction,
    getCaseAction,
    updateCaseAction
};
