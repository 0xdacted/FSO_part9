interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {
  id: string,
  date: string,
}

export interface HospitalEntry extends Entry {
  type: 'Hospital',
  specialist: string,
  diagnosisCodes: string[],
  description: string,
  discharge: {
    date: string,
    criteria: string
  }
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  dateOfBirth: string;
  entries: Entry[]
}


export type NewPatient = Omit<Patient, 'id'>;
export type Diagnoses = Array<Diagnosis>;
export type NonSensitivePatients = Omit<Patient, 'ssn' | 'entries'>;
