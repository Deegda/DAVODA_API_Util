import * as uuid from 'uuid';

export const createUUID = () => {
    const uuidArr = uuid.v4().split('-');
    return uuidArr[1] + uuidArr[2] + uuidArr[0] + uuidArr[3] + uuidArr[4];
};
