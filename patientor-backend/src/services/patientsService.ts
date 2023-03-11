import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients";
import { NonSensitivePatients } from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation
  }));
};

const addPatient = (): 

export default {
  getNonSensitivePatients
}