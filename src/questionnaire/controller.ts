import * as jsonXml from 'jsontoxml';
import {
    getQuestionnaire,
    createQuestionnaire
} from './model';
import { Questionnaire } from '../types/questionnaire';
import { MedicalCase } from '../types/medical_case';
import { createCase } from '../case/model';
import {factorsFactory, questionnaireFactory} from '../helper/factory';
import {Factor} from "../types/factor";
import {createFactor} from "../factor/model";

const getOneQuestionnaireAction = (request, response) => {
    const questionnaireId = request.params.id;
    getQuestionnaire(questionnaireId).then(
        questionnaire => {
            response.format({
                xml() {
                    response.send(jsonXml(questionnaire));
                },
                json() {
                    response.json(questionnaire);
                },
                default() {
                    response.json(questionnaire);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

const createQuestionnaireAction = (request, response) => {
    const newQuestionnaire: Questionnaire = questionnaireFactory(request);
    const newFactors: Factor[] = factorsFactory(request);

    createQuestionnaire(newQuestionnaire).then(
        questionnaire => {
            const newCase: MedicalCase = {
                status: 'unbearbeitet',
                questionnaire: questionnaire['question_id']
            };
            newFactors.forEach(factor => {
                factor.questionnaire = questionnaire['question_id'];
                createFactor(factor).then(f => f);
            });
            createCase(newCase).then(c => c);

            response.format({
                xml() {
                    response.send(jsonXml({questionnaire}));
                },
                json() {
                    response.json(questionnaire);
                },
                default() {
                    response.json(questionnaire);
                }
            });
        },
        error => response.status(500).json(error)
    );
};

export {
    getOneQuestionnaireAction,
    createQuestionnaireAction
};
