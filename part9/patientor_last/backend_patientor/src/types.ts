export interface Diagnoses {
  code: string;
  name: string;
  latin?: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface Diagnosis{
  code:string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

interface  HospitalEntry extends BaseEntry{
  type: 'Hospital';
  discharge: Discharge;
}
interface Discharge{
  date:string;
  criteria:string
}

interface  OccupationalHealthcareEntry extends BaseEntry{
  type:'OccupationalHealthcare';
  employerName:string;
  sickLeave: Sick
}

interface Sick{
  startDate:string;
  endDate:string
}


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type AddPatientEntry = Omit<Patient,'id'|'entries'> 

export enum Gender { Male='male' , Female='female' , Other='other' }

export type NewPatientEntry = Omit<Patient, 'ssn' | 'entries'>;