import * as jsonXml from 'jsontoxml';
import {
    getQuestionnaire,
    postQuestionnaire
} from './model';
import { Questionnaire } from '../types/questionnaire';
import { MedicalCase } from '../types/medical_case';
import { createCase } from '../case/model';
import {factorsFactory, questionnaireFactory} from '../helper/factory';
import {Factor} from "../types/factor";
import {postFactor} from "../factor/model";

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

    postQuestionnaire(newQuestionnaire).then(
        questionnaire => {
            console.log('New questionnaire: ', questionnaire);
            const newCase: MedicalCase = {
                status: 'unbearbeitet',
                questionnaire: questionnaire['question_id']
            };
            newFactors.forEach(factor => {
                factor.questionnaire = questionnaire['question_id'];
                postFactor(factor).then(f => console.log('New Factor: ', f));
            });
            console.log('New factors created');
            console.log('New case: ', JSON.stringify(newCase));
            createCase(newCase).then(c => console.log('New case: ', c));

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
