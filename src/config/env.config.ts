import * as env from 'env-var';

const TOKEN_SECRET = env.get('TOKEN_SECRET').asString();
const SQL_DIALECT = env.get('SQL_DIALECT').asString();
const STORAGE = env.get('STORAGE').asString();


export {
    TOKEN_SECRET,
    SQL_DIALECT,
    STORAGE
};
