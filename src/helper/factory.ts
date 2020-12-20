import { Questionnaire } from '../types/questionnaire';
import { Factor } from '../types/factor';
import { Feedback } from '../types/feedback';
import { Classification } from '../types/classification';
import { MedicalCase } from '../types/medical_case';

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
        feedback: request.body?.feedback,
        questionnaire: request.body?.questionnaire
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

export const classificationFactory = (request): Classification => {
    return {
        category: request.body?.category
    };
};

export const caseFactory = (request): MedicalCase => {
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
