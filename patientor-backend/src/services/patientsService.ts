import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients";
import { NonSensitivePatients, Patient, NewPatient, Gender } from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    gender: gender as Gender,
    occupation,
    dateOfBirth,
  }));
};

const addPatient = ( patient: NewPatient ): Patient  => {
  const addedPatient = {
    id: uuid(),
    ...patient
  };
  patientsData.push(addedPatient);
  return addedPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientsData.find(patient => patient.id === id);
  if (patient) {
    const gender = Object.values(Gender).includes(patient.gender as Gender) ? patient.gender as Gender : Gender.Other;
    return { ...patient, gender, entries: []};
  }
  return patient;
};


export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById
};