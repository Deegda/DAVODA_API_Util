export const makeRandomCode = (length: number) => {
    return Math.random().toString().replace('0.', '').slice(0, length);
};
