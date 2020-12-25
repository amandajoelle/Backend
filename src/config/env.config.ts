import * as env from 'env-var';

/**
 * Library to read the environment variables and pars them into the
 * right type
 */
const TOKEN_SECRET = env.get('TOKEN_SECRET').asString();
const SQL_DIALECT = env.get('SQL_DIALECT').asString();
const STORAGE = env.get('STORAGE').asString();


export {
    TOKEN_SECRET,
    SQL_DIALECT,
    STORAGE
};
