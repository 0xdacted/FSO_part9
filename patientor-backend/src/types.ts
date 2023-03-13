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

export interface OccupationalHealthcareEntry extends Entry {
  type: 'OccupationalHealthcare',
  specialist: string,
  employerName: string,
  diagnosisCodes: string[],
  description: string,
  sickLeave: {
    startDate: string,
    endDate: string
  }
}

export interface HealthCheckEntry extends Entry {
  type: 'HealthCheck',
  id: string,
  date: string,
  specialist: string,
  description: string,
  healthCheckRating: number
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
