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

export default {
  getNonSensitivePatients
}