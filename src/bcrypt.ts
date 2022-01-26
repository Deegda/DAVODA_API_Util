import * as bcrypt from 'bcrypt';

export const hash = (plainText: string) => {
    const SALT = 8;
    return bcrypt.hash(plainText, SALT);
};

export const compareHash = (text: string, hashedText: string) => {
    return bcrypt.compare(text, hashedText);
};
