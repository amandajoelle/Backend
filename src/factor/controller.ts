import * as jsonXml from 'jsontoxml';
import {
    getFactor,
    getFactorsOfQuestionnaire,
    getFactorsOfFeedback
} from './model';

const listFactorsOfQuestionnaire = (request, response) => {
    const questionnaireId = request.params.id;
    getFactorsOfQuestionnaire(questionnaireId).then(
        factors => {
            response.format({
                xml() {
                    response.send(jsonXml(factors.map(factor => ({ factor }))));
                },
                json() {
                    response.json(factors);
                },
                default() {
                    response.json(factors);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

const listFactorsOfFeedback = (request, response) => {
    const feedbackId = request.params.id;
    getFactorsOfFeedback(feedbackId).then(
        factors => {
            response.format({
                xml() {
                    response.send(jsonXml(factors.map(factor => ({ factor }))));
                },
                json() {
                    response.json(factors);
                },
                default() {
                    response.json(factors);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

const fetchFactor = (request, response) => {
    const factorId = request.params.id;
    getFactor(factorId).then(
        factor => {
            response.format({
                xml() {
                    response.send(jsonXml({ factor }));
                },
                json() {
                    response.json(factor);
                },
                default() {
                    response.json(factor);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

export {
    listFactorsOfFeedback,
    listFactorsOfQuestionnaire,
    fetchFactor
};
