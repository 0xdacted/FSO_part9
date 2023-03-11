"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseString = (field, value) => {
    if (!value || !isString(value)) {
        throw new Error(`Invalid or missing ${field}`);
    }
    return value;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Invalid or missing date of birth`);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Invalid or missing gender`);
    }
    return gender;
};
const toNewPatient = (object) => {
    const addedPatient = {
        name: parseString('name', object.name),
        ssn: parseString('ssn', object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseString('occupation', object.occupation)
    };
    return addedPatient;
};
exports.default = toNewPatient;
