import { v4 as uuidv4 } from 'uuid';

export const INDEX = "INDEX";

/**
 * Generate a random UUID (UUID V4)
 */
export const generateUUID = (): string => {
    return uuidv4();
}

/**
 * Used to remve item from an array immutabaly
 * @param {array} array the original JS array
 * @param {string} fieldName name of the field to identify the object from
 * @param {value} value value of the field
 */
export const removeItemFromArray = (array: any[], fieldName: string, value: any) => {
    if (fieldName === INDEX) {
        let arr = array.filter((item, index) => {
            return index !== value;
        });

        return arr;
    }
    let newArr = array.filter((item) => {
        return item[fieldName] !== value;
    });

    return newArr;
};