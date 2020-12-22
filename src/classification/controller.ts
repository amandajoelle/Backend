import * as jsonXml from 'jsontoxml';
import {
    getClassification,
    createClassification,
    updateClassification
} from './model';
import { classificationFactory } from '../helper/factory';
import { updateCase } from '../case/model';

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
