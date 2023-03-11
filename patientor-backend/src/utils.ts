import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: unknown): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (field: string, value: unknown): string => {
  if (! value || !isString(value)) {
    throw new Error(`Invalid or missing ${field}`);
  }
  return value;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of birth`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Invalid or missing gender`);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  const addedPatient: NewPatient = {
    name: parseString('name', object.name),
    ssn: parseString('ssn', object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation)
  };
  return addedPatient;
};

export default toNewPatient;