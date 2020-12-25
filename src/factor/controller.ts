import * as jsonXml from 'jsontoxml';
import {
    getFactor,
    getFactorsOfQuestionnaire,
    getFactorsOfFeedback
} from './model';

/**
 * Function to resolve a query for all factors of one specified
 * questionnaire
 * @param request, the express request property
 * @param response, the express response property
 */
const listFactorsOfQuestionnaireAction = (request, response): void => {
    const questionnaireId = request.params.id;
    getFactorsOfQuestionnaire(questionnaireId).then(
        factors => {
            response.format({
                xml() {
                    response.send(jsonXml(factors.map(factor => ({ ...factor }))));
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

/**
 * Function to resolve a query for all factors of one specified
 * feedback
 * @param request, the express request property
 * @param response, the express response property
 */
const listFactorsOfFeedbackAction = (request, response): void => {
    const feedbackId = request.params.id;
    getFactorsOfFeedback(feedbackId).then(
        factors => {
            response.format({
                xml() {
                    response.send(jsonXml(factors.map(factor => ({ ...factor }))));
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

/**
 * Function to resolve a query to get a specified factor
 * @param request, the express request property
 * @param response, the express response property
 */
const getFactorAction = (request, response): void => {
    const factorId = request.params.id;
    getFactor(factorId).then(
        factor => {
            response.format({
                xml() {
                    response.send(jsonXml(factor.toJSON()));
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
    listFactorsOfFeedbackAction,
    listFactorsOfQuestionnaireAction,
    getFactorAction
};
