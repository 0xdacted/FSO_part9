interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Diagnoses = Array<Diagnosis>;
export type NonSensitivePatients = Omit<Patient, 'ssn'>;
