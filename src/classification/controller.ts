import * as jsonXml from 'jsontoxml';
import {
    getClassification,
    createClassification,
    updateClassification
} from './model';
import { classificationFactory } from '../helper/factory';
import { updateCase } from '../case/model';

/**
 * Function to resolve a query for an specified classification object
 * @param request, the express request property
 * @param response, the express response property
 */
const getClassificationAction = (request, response): void => {
    const classificationId = request.params.id;

    getClassification(classificationId).then(
        classification => {
            response.format({
                xml() {
                    response.send(jsonXml({ classification }));
                },
                json() {
                    response.json(classification);
                },
                default() {
                    response.json(classification);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

/**
 * Function to resolve a query to create a new classification object
 * @param request, the express request property
 * @param response, the express response property
 */
const postClassificationAction = (request, response): void => {
    const userId = request.user;
    const caseId = request.body.caseId;
    const newClassification = classificationFactory(request);

    createClassification(newClassification).then(
        classification => {
            updateCase(
                caseId,
                { classification: classification['class_id'] },
                ['classification'])
                .then(c => c);
            response.format({
                xml() {
                    response.send(jsonXml({ classification }));
                },
                json() {
                    response.json(classification);
                },
                default() {
                    response.json(classification);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

/**
 * Function to resolve a query to update a specified classification object
 * @param request, the express request property
 * @param response, the express response property
 */
const putClassificationAction = (request, response): void => {
    const userId = request.user;
    const classificationId = request.params.id;
    const classificationUpdate = classificationFactory(request);

    updateClassification(classificationId, classificationUpdate, Object.keys(classificationUpdate)).then(
        classification => {
            response.format({
                xml() {
                    response.send(jsonXml({ classification }));
                },
                json() {
                    response.json(classification);
                },
                default() {
                    response.json(classification);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

export {
    getClassificationAction,
    postClassificationAction,
    putClassificationAction
};
