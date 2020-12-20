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
