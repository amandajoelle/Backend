import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/cirs.db',
});

// Models of Tables
const Case = sequelize.define(
    'Case',
    {
        case_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        feedback: {
            type: DataTypes.INTEGER,
            references: 'Feedback'
        },
        questionnaire: {
            type: DataTypes.INTEGER,
            references: 'Questionnaire'
        },
        classification: {
            type: DataTypes.INTEGER,
            references: 'Classification'
        },
        editor: {
            type: DataTypes.INTEGER,
            references: 'Employee'
        }
    },
    {
        timestamps: false,
        tableName: 'Medical_Case'
    }
);

const Questionnaire = sequelize.define(
    'Questionnaire',
    {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        expertise: {
            type: DataTypes.TEXT
        },
        age_group: {
            type: DataTypes.TEXT
        },
        sex: {
            type: DataTypes.TEXT
        },
        location: {
            type: DataTypes.TEXT
        },
        event: {
            type: DataTypes.TEXT
        },
        result: {
            type: DataTypes.TEXT
        },
        reasons: {
            type: DataTypes.TEXT
        },
        frequency: {
            type: DataTypes.TEXT
        },
        reporter: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        tableName: 'Questionnaire'
    }
);

const Employee = sequelize.define(
    'Employee',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        email: {
            type: DataTypes.TEXT,
            unique: true
        },
        password: {
            type: DataTypes.TEXT
        },
        forename: {
            type: DataTypes.TEXT
        },
        lastname: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        tableName: 'Employee'
    }
);

const Classification = sequelize.define(
    'Classification',
    {
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        category: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        tableName: 'Classification'
    }
);

const Feedback = sequelize.define(
    'Feedback',
    {
        feedback_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        comment: {
            type: DataTypes.TEXT
        },
        solution: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        tableName: 'Feedback'
    }
);

const Factor = sequelize.define(
    'Factor',
    {
        factor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT
        },
        feedback: {
            type: DataTypes.INTEGER,
            references: 'Feedback'
        },
        questionnaire: {
            type: DataTypes.INTEGER,
            references: 'Questionnaire'
        }
    },
    {
        timestamps: false,
        tableName: 'Factor'
    }
);

// Relations
// Relation between Medical_Case and Questionnaire
/*
Questionnaire.hasOne(Case, { foreignKey: 'questionnaire' });
Case.belongsTo(Questionnaire);

// Relation between Medical_Case and Employee
Employee.hasMany(Case, { foreignKey: 'editor' });
Case.belongsTo(Employee);

// Relation between Medical_Case and Classification
Classification.hasMany(Case);
Case.belongsTo(Classification);

// Relation between Medical_Case and Feedback
Feedback.hasOne(Case);
Case.belongsTo(Feedback);

// Relation between Questionnaire and Factor
Questionnaire.hasMany(Factor);
Factor.belongsTo(Questionnaire);

// Relation between Feedback and Factor
Feedback.hasMany(Factor);
Factor.belongsTo(Feedback);
*/

export {
    Case,
    Questionnaire,
    Employee,
    Classification,
    Feedback,
    Factor
};
