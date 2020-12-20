import { Sequelize, DataTypes, Dialect } from 'sequelize';
import { SQL_DIALECT, STORAGE } from '../config/env.config';

const sequelize = new Sequelize({
    dialect: SQL_DIALECT as Dialect,
    storage: STORAGE,
});

// Models of Tables
const Case = sequelize.define(
    'Case',
    {
        case_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT
        },
        feedback: {
            type: DataTypes.UUID,
            references: 'Feedback'
        },
        questionnaire: {
            type: DataTypes.UUID,
            references: 'Questionnaire'
        },
        classification: {
            type: DataTypes.UUID,
            references: 'Classification'
        },
        editor: {
            type: DataTypes.UUID,
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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        content: {
            type: DataTypes.TEXT
        },
        feedback: {
            type: DataTypes.UUID,
            references: 'Feedback'
        },
        questionnaire: {
            type: DataTypes.UUID,
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
Questionnaire.hasOne(Case, { foreignKey: { name: 'questionnaire' } });
Case.belongsTo(Questionnaire, { foreignKey: { name: 'questionnaire' } });

// Relation between Medical_Case and Employee
Employee.hasMany(Case, { foreignKey: { name: 'editor' } });
Case.belongsTo(Employee, { foreignKey: { name: 'editor' } });

// Relation between Medical_Case and Classification
Classification.hasMany(Case, { foreignKey: { name: 'classification' } });
Case.belongsTo(Classification, { foreignKey: { name: 'classification' } });

// Relation between Medical_Case and Feedback
Feedback.hasOne(Case, { foreignKey: { name: 'feedback' } });
Case.belongsTo(Feedback, { foreignKey: { name: 'feedback' } });

// Relation between Questionnaire and Factor, for eager fetching
Questionnaire.hasMany(Factor, { foreignKey: { name: 'questionnaire' } });
Factor.belongsTo(Questionnaire, { foreignKey: { name: 'questionnaire' } });

// Relation between Feedback and Factor
Feedback.hasMany(Factor, { foreignKey: { name: 'feedback'} });
Factor.belongsTo(Feedback, { foreignKey: { name: 'feedback' } });

export {
    Case,
    Questionnaire,
    Employee,
    Classification,
    Feedback,
    Factor
};
