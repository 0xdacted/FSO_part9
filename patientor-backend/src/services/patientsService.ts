import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients";
import { NonSensitivePatients, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation
  }));
};

const addPatient = ( name: string, gender: string, ssn: string, occupation: string): Patient => {
  const newPatient = {
    id: uuid(),
    name,
    gender,
    ssn,
    occupation,
  };
  patientsData.push(newPatient)
  return newPatient
}


export default {
  getNonSensitivePatients,
  addPatient
}