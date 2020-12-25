import { createHash } from 'crypto';

/**
 * Hashes a password with the SHA256 algorithm
 * @param password
 * @returns string, the hashed password
 */
const generateSHA256Hash = (password: string): string => {
    return createHash('sha256')
        .update(password)
        .digest('hex');
};

/**
 * Hashes a password with the SHA512 algorithm
 * @param password
 * @returns string, the hashed password
 */
const generateSHA512Hash = (password: string): string => {
    return createHash('sha512')
        .update(password)
        .digest('hex');
};

/**
 * Hashes a password with the MD5 algorithm
 * @param password
 * @returns string, the hashed password
 */
const generateMD5Hash = (password: string): string => {
    return createHash('md5')
        .update(password)
        .digest('hex');
};

export {
    generateSHA256Hash,
    generateSHA512Hash,
    generateMD5Hash
}
