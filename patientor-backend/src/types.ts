interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;
export type Diagnoses = Array<Diagnosis>;
export type NonSensitivePatients = Omit<Patient, 'ssn'>;
