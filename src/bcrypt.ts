import * as bcrypt from 'bcrypt';

export const hash = async (plainText: string) => {
    const SALT = 8;
    return await bcrypt.hash(plainText, SALT);
};

export const compareHash = async (text: string, hashedText: string) => {
    return await bcrypt.compare(text, hashedText);
};
