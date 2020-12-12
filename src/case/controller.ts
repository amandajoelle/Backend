import * as jsonXml from 'jsontoxml';
import {
    getAllDoneCases,
    getAllUndoneCases,
    getCase
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
    console.log('UserId: ', userId);
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
    console.log('CaseId type: ', typeof caseId);
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

export {
    listDoneAction,
    listUndoneAction,
    oneCaseAction
};
