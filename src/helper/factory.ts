import { Questionnaire } from '../types/questionnaire';
import { Factor } from '../types/factor';
import { Feedback } from '../types/feedback';
import { Classification } from '../types/classification';
import { MedicalCase } from '../types/medical_case';

/**
 * Factory method, to create a new questionnaire object from
 * the request body
 * @param request, the express request property
 * @returns Questionnaire, new questionnaire object
 */
const questionnaireFactory = (request): Questionnaire => {
    return {
        expertise: request.body.expertise,
        ageGroup: request.body.ageGroup,
        sex: request.body.sex,
        location: request.body.location,
        event: request.body.event,
        result: request.body.result,
        reasons: request.body.reasons,
        frequency: request.body.frequency,
        reporter: request.body.reporter
    };
};

/**
 * Factory method, to create a factor object from
 * the request body
 * @param request, the express request property
 * @returns Factor, new factor object
 */
const factorFactory = (request): Factor => {
    return {
        content: request.body.content,
        feedback: request.body?.feedback,
        questionnaire: request.body?.questionnaire
    };
};

/**
 * Factory method, to create an array of factor objects
 * from the request body
 * @param request, the express request property
 * @returns Factor[], array of factor objects
 */
const factorsFactory = (request): Factor[] => {
    const factors: Factor[] = [];
    request.body?.factors.forEach(factor => {
        factors.push(factor);
    });
    return factors;
};

/**
 * Factory method, to create a new feedback object
 * @param request, the express request property
 * @returns Feedback, the new feedback object
 */
const feedbackFactory = (request): Feedback => {
    return {
        comment: request.body?.comment,
        solution: request.body?.solution
    };
};

/**
 * Factory method, to create a new classification object
 * @param request, the express request property
 * @returns Classification, the new classification object
 */
const classificationFactory = (request): Classification => {
    return {
        category: request.body?.category
    };
};

/**
 * Factory method, to create a new medical case object
 * @param request, the express request property
 * @returns MedicalCase, the new medical case object
 */
const caseFactory = (request): MedicalCase => {
    return {
        caseId: request.body?.caseId,
        title: request.body?.title,
        status: request.body?.status,
        feedback: request.body?.feedback,
        questionnaire: request.body?.questionnaire,
        classification: request.body?.classification,
        editor: request.body?.editor
    };
}

export {
    questionnaireFactory,
    factorFactory,
    factorsFactory,
    feedbackFactory,
    classificationFactory,
    caseFactory
};
