import diagnosesData from "../../data/diagnoses";
import { Diagnoses } from "../types";

const diagnoses: Diagnoses = diagnosesData;
const getDiagnoses = () => {
  return diagnoses;
};


export default {
  getDiagnoses
};