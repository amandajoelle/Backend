import * as request from 'supertest';
import { createServer } from '../src/server';
import { createQuestionnaire } from '../src/questionnaire/model';

const app = createServer();

describe('questionnaire', () => {
    const questionnairePost = {
        expertise:"Innere Medizin",
        ageGroup:"51-60",
        sex:"männlich",
        location:"Krankenhaus",
        event:"Pat. hat die Tabletten des Nachbarpatienten eingenommen, diese wirken gegen hohen Blutdruck, Cholesterinsenker, und Pulssenker, ärztliche Person informiert, regelmäßige Kontrolle von Blutdruck und Puls.",
        result:"Meldung an ärztliche Person der Station, Überwachung der Vitalparameter. Kein Schaden.",
        reasons:"Verminderte Aufmerksamkeit über Gesamtsituation im Zimmer.\nAufnahme und Analyse im Projekt \"AMTS Stellen und Verabreichen\". Die Analyse zeigt, dass es hier eine Verwechselung durch den Patienten gegeben hat. Eine Beschriftung war auf dem \"Tablettenpöttchen\" vorhanden. Beide Patienten wurden auf Zimmerebene mobilisiert und sollten gemeinsam am Tisch essen. Dabei ist es zur versehentlichen Einnahme der Tabletten gekommen.\nEmpfehlung: Vor Ort bei der Einnahme der Tabletten dabei bleiben. Insbesondere wenn der medizinisch-pflegerische Zustand des Patienten darauf hindeuten, dass der Grad der Selbstständigkeit diesbezüglich eingeschränkt ist. Vor der Verabreichung sollte eine Einzelkontrolle (Abgleich Anordnung und Medikament) stattfinden. Die eindeutige Beschriftung und der Abgleich mit dem Patienten (Ansprache, Identifikationsarmband) tragen zur eindeutigen Identifikation des richtigen Patienten bei.",
        frequency:"nicht anwendbar",
        reporter:"Pflege-, Praxispersonal",
        factors: []
    };

    it('should insert a questionnaire into, with factors, in the database', async () => {
        const response = await request(app)
            .post('/questionnaire/')
            .send(questionnairePost)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ question_id: expect.any(String) });
    })

    it('should get the questionnaire of the given id', async () => {
        const questionnaire = await createQuestionnaire(questionnairePost);
        const response = await request(app)
            .get('/questionnaire/' + questionnaire['question_id'])
            .set('Accept', 'application(json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual( { ...questionnaire['dataValues'], Factors: [] });
    })

    afterAll(() => {
        app.close();
    })
});
