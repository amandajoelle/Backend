CREATE TABLE Classification (
    class_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT
);

CREATE TABLE Feedback (
    feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT,
    solution TEXT
);

CREATE TABLE Employee (
    employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT,
    forename TEXT,
    lastname TEXT
);

CREATE TABLE Questionnaire (
    question_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    factor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    feedback INTEGER,
    questionnaire INTEGER,
    FOREIGN KEY (feedback) REFERENCES Feedback(feedback_id),
    FOREIGN KEY (questionnaire) REFERENCES Questionnaire(question_id)
);

CREATE TABLE Medical_Case (
    case_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT,
    feedback INTEGER,
    questionnaire INTEGER,
    classification INTEGER,
    editor INTEGER,
    FOREIGN KEY (feedback) REFERENCES Feedback(feedback_id),
    FOREIGN KEY (questionnaire) REFERENCES Questionnaire(question_id),
    FOREIGN KEY (classification) REFERENCES Classification(class_id),
    FOREIGN KEY (editor) REFERENCES Employee(employee_id)
);

INSERT INTO Employee(email,password,forename,lastname) VALUES("Mueller@cirs.de","d9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85","Bob","Mueller");
INSERT INTO Employee(email,password,forename,lastname) VALUES("Musterfrau@cirs.de","d9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85","Erika","Musterfrau");

INSERT INTO Questionnaire(expertise,age_group,sex, location, event,result,reasons,frequency,reporter) 
VALUES("Innere Medizin","51-60","männlich","Krankenhaus","falsches Patientenarmband\nPatient kam als Notfall in die ZNA, wurde reanimiert und kam auf die Intensivstation und verstarb dort\nDem Bestatter viel im Bestattungshaus auf, dass der Name am Fußzettel und der Name auf dem Patientenarmband nicht übereinstimmt. Der Bestatter kam mit Patienten zurück und Identität wurde überprüft und bestätigt.",
"Hoher Zeitaufwand und hohe Verunsicherung\nDer andere Patient hatte das richtige Armband","1. In der ZNA waren mehrere Patienten gleichzeitig. Der Patient hat das falsche Armband eines anderen Patienten bekommen, der zeitgleich da war.\n2. Bei der Übergabe von ZNA an die Intensivstation wurde die Identität nicht überprüft\n3. Bei der Übergabe an Bestatter wurde auch die Identität am Armband nicht überprüft",
"erstmalig","Pflege-, Praxispersonal");
INSERT INTO Factor(content, questionnaire) VALUES("Persönliche Faktoren des Mitarbeiters (Müdigkeit, Gesundheit, Motivation etc.)",1);
INSERT INTO Factor(content, questionnaire) VALUES("Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)",1);
INSERT INTO Questionnaire(expertise,age_group,sex, location, event,result,reasons,frequency,reporter) 
VALUES("Augenheilkunde","51-60","weiblich","Krankenhaus","Patientin ruft an, weil ihr von der Therapie seit dem Wochenende schwindelig wird.\nEs fällt auf, dass versehentlich Sulfasalazin statt Sulfadiazin verordnet wurde.\nPat. gibt an, bereits seit ein paar Tagen ein falsches Medikament einzunehmen. Initial durch unsere Abteilung korrektes Rezept ausgestellt und durch die Apotheke falsch herausgegeben. Dann falsches Rezept als Verlängerung der Therapie ausgestellt (bisher hiervon nur eine Tablette genommen).",
"durch Fehleinnahme keine Schäden zu erwarten","Keine erneute Prüfung der Medikation bei der Verlängerung der Medikamente.","nicht anwendbar","Arzt / Ärztin, Psychotherapeut/in");
INSERT INTO Factor(content, questionnaire) VALUES("Persönliche Faktoren des Mitarbeiters (Müdigkeit, Gesundheit, Motivation etc.)",2);
INSERT INTO Factor(content, questionnaire) VALUES("Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)",2);
INSERT INTO Factor(content, questionnaire) VALUES("Medikation (Medikamente beteiligt?)",2);
INSERT INTO Questionnaire(expertise,age_group,sex, location, event,result,reasons,frequency,reporter) 
VALUES("Psychiatrie","41-50","männlich","Krankenhaus","Patient erhielt versehentlich 1 Kps Dekristol 20000 IE (Vitamin D)","nichts passiert","Unkonzentriertheit, Überlastung",
"nicht anwendbar","Pflege-, Praxispersonal");
INSERT INTO Factor(content, questionnaire) VALUES("Organisation (zu wenig Personal, Standards, Arbeitsbelastung, Abläufe etc.)",3);
INSERT INTO Factor(content, questionnaire) VALUES("Medikation (Medikamente beteiligt?)",3);

INSERT INTO Medical_Case (title, status, questionnaire) VALUES("Medikamentenfehlgabe","unbearbeitet",3);
INSERT INTO Medical_Case (title, status, questionnaire,editor) VALUES("Falsches Patientenarmband","in Bearbeitung",1,1);
INSERT INTO Medical_Case (title, status, questionnaire,editor) VALUES("Medikamentenfehleinnahme","in Bearbeitung",2,2);