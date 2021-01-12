DROP TABLE Classification;
DROP TABLE Feedback;
DROP TABLE Employee;
DROP TABLE Questionnaire;
DROP TABLE Factor;
DROP TABLE Medical_Case;

CREATE TABLE Classification (
    class_id TEXT PRIMARY KEY NOT NULL,
    category TEXT
);

CREATE TABLE Feedback (
    feedback_id TEXT PRIMARY KEY NOT NULL,
    comment TEXT,
    solution TEXT
);

CREATE TABLE Employee (
    employee_id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT,
    forename TEXT,
    lastname TEXT
);

CREATE TABLE Questionnaire (
    question_id TEXT PRIMARY KEY NOT NULL,
    expertise TEXT,
    age_group TEXT,
    sex TEXT,
    location TEXT,
    event TEXT,
    result TEXT,
    reasons TEXT,
    frequency TEXT,
    reporter TEXT
);

CREATE TABLE Factor (
    factor_id TEXT PRIMARY KEY NOT NULL,
    content TEXT,
    feedback TEXT,
    questionnaire TEXT,
    FOREIGN KEY (feedback) REFERENCES Feedback(feedback_id),
    FOREIGN KEY (questionnaire) REFERENCES Questionnaire(question_id)
);

CREATE TABLE Medical_Case (
    case_id TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    status TEXT,
    feedback TEXT,
    questionnaire TEXT,
    classification TEXT,
    editor TEXT,
    FOREIGN KEY (feedback) REFERENCES Feedback(feedback_id),
    FOREIGN KEY (questionnaire) REFERENCES Questionnaire(question_id),
    FOREIGN KEY (classification) REFERENCES Classification(class_id),
    FOREIGN KEY (editor) REFERENCES Employee(employee_id)
);

INSERT INTO Employee(employee_id,email,password,forename,lastname) VALUES("1","Mueller@cirs.de","d9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85","Bob","Mueller");
INSERT INTO Employee(employee_id,email,password,forename,lastname) VALUES("2","Musterfrau@cirs.de","d9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85","Erika","Musterfrau");

INSERT INTO Questionnaire(question_id,expertise,age_group,sex, location, event,result,reasons,frequency,reporter)
VALUES("1","Innere Medizin","51-60","männlich","Krankenhaus","falsches Patientenarmband\nPatient kam als Notfall in die ZNA, wurde reanimiert und kam auf die Intensivstation und verstarb dort\nDem Bestatter viel im Bestattungshaus auf, dass der Name am Fußzettel und der Name auf dem Patientenarmband nicht übereinstimmt. Der Bestatter kam mit Patienten zurück und Identität wurde überprüft und bestätigt.",
"Hoher Zeitaufwand und hohe Verunsicherung\nDer andere Patient hatte das richtige Armband","1. In der ZNA waren mehrere Patienten gleichzeitig. Der Patient hat das falsche Armband eines anderen Patienten bekommen, der zeitgleich da war.\n2. Bei der Übergabe von ZNA an die Intensivstation wurde die Identität nicht überprüft\n3. Bei der Übergabe an Bestatter wurde auch die Identität am Armband nicht überprüft",
"erstmalig","Pflege-, Praxispersonal");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("1", "Persönliche Faktoren des Mitarbeiters (Müdigkeit, Gesundheit, Motivation etc.)","1");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("2","Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)","1");

INSERT INTO Questionnaire(question_id,expertise,age_group,sex, location, event,result,reasons,frequency,reporter)
VALUES("2","Augenheilkunde","51-60","weiblich","Krankenhaus","Patientin ruft an, weil ihr von der Therapie seit dem Wochenende schwindelig wird.\nEs fällt auf, dass versehentlich Sulfasalazin statt Sulfadiazin verordnet wurde.\nPat. gibt an, bereits seit ein paar Tagen ein falsches Medikament einzunehmen. Initial durch unsere Abteilung korrektes Rezept ausgestellt und durch die Apotheke falsch herausgegeben. Dann falsches Rezept als Verlängerung der Therapie ausgestellt (bisher hiervon nur eine Tablette genommen).",
"durch Fehleinnahme keine Schäden zu erwarten","Keine erneute Prüfung der Medikation bei der Verlängerung der Medikamente.","nicht anwendbar","Arzt / Ärztin, Psychotherapeut/in");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("3","Persönliche Faktoren des Mitarbeiters (Müdigkeit, Gesundheit, Motivation etc.)","2");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("4","Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)","2");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("5","Medikation (Medikamente beteiligt?)","2");

INSERT INTO Questionnaire(question_id, expertise,age_group,sex, location, event,result,reasons,frequency,reporter)
VALUES("3","Psychiatrie","41-50","männlich","Krankenhaus","Patient erhielt versehentlich 1 Kps Dekristol 20000 IE (Vitamin D)","nichts passiert","Unkonzentriertheit, Überlastung",
"nicht anwendbar","Pflege-, Praxispersonal");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("6","Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)","3");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES("7", "Medikation (Medikamente beteiligt?)","3");

INSERT INTO Questionnaire(question_id, expertise, age_group, sex, location, event, result, reasons, frequency, reporter)
VALUES ("4", "anderes Fachgebiet: Neurochirurgie/Anästhesie", "unbekannt", "unbekannt", "Krankenhaus", "Pat. hat falsches Namensbändchen erhalten & ist damit in OP gefahren.\nDies wurde weder vom Transportdienst noch von der Schleuse, noch von der Anästhesie bemerkt. Anästhesist hat lt. Aussage die Patientin per Nachfragen (Name/Geb.-Datum) identifiziert. Falsches Bändchen ist dem Operateur aufgefallen, als die Patientin bereits in Narkose lag & nicht mehr nach Identität befragt werden konnte.",
        "SOP-Aktualisierung 'Anlegen von Namensbändchen' und SOP 'Identifizierung bei Eintritt in OP' und Vorstellung in der M+M-Konferenz", "SOP liegt eigentlich vor, muss aber spezifischer formuliert werden", "erstmalig", "Arzt / Ärztin, Psychotherapeut/in");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES ("8", "Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)", "4");

INSERT INTO Feedback(feedback_id, comment, solution) VALUES ("1", "Vielen Dank für die Eingabe.\n\nPatientenverwechslungen, egal welcher Art, können schwerste Konsequenzen nach sich ziehen und verlangen daher ungeteilte Aufmerksamkeit. Aus diesem Grund ist es hier empfehlenswert, die Umstände im vorliegenden Fall genauer aufzuarbeiten, um geeignete Vermeidungsstrategien implementieren zu können.\n\nNeben der Frage, ob die Sicherheitscheckliste beim Einschleusen ordnungsgemäß abgearbeitet wurde, bleibt unklar, wie es zum Anlegen eines falschen Namensbändchens (bei der Patientenaufnahme) kam.",
                                                             "Ganz allgemein muss darauf hingewiesen werden, dass der Check beim Einschleusen zur OP nur relative Sicherheit bietet – sofern der Patient seine Identität und den in der Akte notierten Eingriff bestätigt und alle Unterlagen komplett vorliegen, steht dem Einschleusen nichts im Wege.\n\nVor jeder Maßnahme sollten sich dabei alle Beteiligten versichern, dass beim richtigen Patienten die richtige Maßnahme durch den richtigen Behandler durchgeführt wird. Ein stetiger Abgleich mit dem Identifikationsarmband und der direkten Patientenansprache ist hierbei unerlässlich.\n\nDer Einsatz von Patientenidentifikationsarmbändern führt aber erst dann zu einer tatsächlichen Verbesserung der Patientensicherheit, wenn diese auch von den Klinikmitarbeitern regelmäßig und sachgerecht genutzt werden. Die Implementierung trägt maßgeblich dazu bei, ob die Armbänder von den Mitarbeitern als wichtige Maßnahme angesehen und umgesetzt werden.\n\nDieser CIRS-Bericht kann als Anlass dienen, um die tatsächliche Nutzung und Umsetzung der Armbänder zu evaluieren. Dabei sollten mögliche Hürden in Bezug auf die Umsetzung in den Mittelpunkt gerückt werden, um diese herauszufiltern und zu bearbeiten. Die Aktualisierung der dazugehörigen SOP ist hierfür ein wichtiger Schritt.\n\nZudem sollten alle Mitarbeiter auf das Thema 'Patientenverwechslung' sensibilisiert werden. Unter der Freitextsuche mit dem Stichwort 'Patientenverwechslung' wird ersichtlich, wie viele eingegangene und kommentierte Berichte sich mit dem Thema einer möglichen Patientenverwechslung befassen.");

INSERT INTO Questionnaire(question_id, expertise, age_group, sex, location, event, result, reasons, frequency, reporter) VALUES ("5", "Orthopädie", "71-80", "weiblich", "Krankenhaus", "Patientin, die auf Nüsse allergisch ist und dies auch angegeben hatte, hat auf ihrer Essenskarte 'Bitte Nüsse' stehen gehabt. Dadurch waren Nüsse auf dem Essen.",
                                                                                                                                 "Pflegekraft, die das Essen verteilt hatte, ist der Fehler aufgefallen, aber nur, weil sie die Patientin aufgenommen hatte und sich an die Allergie erinnert hatte.", "Verständigungsproblem? Flüchtigkeitsfehler durch Zeitdruck.",
                                                                                                                                 "erstmalig", "andere Berufsgruppe");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES ("9", "Persönliche Faktoren des Mitarbeiters (Müdigkeit, Gesundheit, Motivation etc.)", "5");
INSERT INTO Factor(factor_id, content, questionnaire) VALUES ("10", "Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)", "5");

INSERT INTO Feedback(feedback_id, solution) VALUES ("2", "Durch die Aufmerksamkeit einer Pflegekraft konnte rechtzeitig verhindert werden, dass die Patientin ein Nahrungsmittel zu sich nimmt, auf welches sie allergisch reagiert. Bei Patienten, die nicht orientiert oder kognitiv eingeschränkt sind, besteht ein erhöhtes Risiko, dass das Nahrungsmittel bzw. ein Allergen nicht erkannt werden. Der Prozess der Essensbestellung bei Allergien sollte dementsprechend klar geregelt sein, damit es zu keiner Patientengefährdung kommt.\n\nDieser Bericht kann als Anlass genommen werden, den Prozess der Essensbestellung bei Allergien eindeutig zu regeln, damit es zu keiner Patientengefährdung kommt.");
INSERT INTO Factor(factor_id, content, feedback) VALUES ("11", "Evtl. Verständigungsproblem", "2");
INSERT INTO Factor(factor_id, content, feedback) VALUES ("12", "Evtl. Flüchtigkeitsfehler durch Zeitdruck", "2");
INSERT INTO Factor(factor_id, content, feedback) VALUES ("13", "Evtl. keine Weiterleitung der Information über bestehende Allergie", "2");
INSERT INTO Factor(factor_id, content, feedback) VALUES ("14", "Evtl. Anwenderfehler in der Bestellsoftware für Essen", "2");
INSERT INTO Factor(factor_id, content, feedback) VALUES ("15", "Evtl. Anwenderfehler in der Bestellsoftware für die Patientenessen", "2");

INSERT INTO Medical_Case (case_id, title, status, questionnaire) VALUES("1","Medikamentenfehlgabe","unbearbeitet","3");
INSERT INTO Medical_Case (case_id, title, status, questionnaire,editor) VALUES("2","Falsches Patientenarmband","in Bearbeitung","1","1");
INSERT INTO Medical_Case (case_id, title, status, questionnaire,editor) VALUES("3","Medikamentenfehleinnahme","in Bearbeitung","2","2");
INSERT INTO Medical_Case (case_id, title, status, feedback, questionnaire, editor) VALUES ("4", "Falsches Patientenidentifikationsarmband", "erledigt", "1", "4", "1");
INSERT INTO Medical_Case (case_id, title, status, feedback, questionnaire, editor) VALUES ("5", "Fehlende Beachtung einer Nahrungsmittelallergie", "erledigt", "2", "5", "1");
