import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (field: string, value: any): string => {
  if (! value || !isString(value)) {
    throw new Error(`Invalid or missing ${field}`)
  }
  return value;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of birth`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Invalid or missing gender`);
  }
  return gender;
};

const toNewPatient = (object: any): newPatient => {
  const newPatient: NewPatient = {
    name: parseString('name', object.name),
    ssn: parseString('ssn', object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation)
  };
  return newPatient;
};

export default toNewPatient;