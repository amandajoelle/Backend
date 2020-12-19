import { Questionnaire } from '../types/questionnaire';
import { Factor } from '../types/factor';
import { Feedback } from '../types/feedback';

export const questionnaireFactory = (request): Questionnaire => {
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

export const factorFactory = (request): Factor => {
    return {
        content: request.body.content,
        feedback: request.body.feedback ? request.body.feedback : null,
        questionnaire: request.body.questionnaire ? request.body.questionnaire : null
    };
};

export const factorsFactory = (request): Factor[] => {
    const factors: Factor[] = [];
    request.body.factors.forEach(factor => {
        factors.push(factor);
    });
    return factors;
};

export const feedbackFactory = (request): Feedback => {
    return {
        comment: request.body?.comment,
        solution: request.body?.solution
    };
};
