import { NewEntrySchema } from "./utils";
import {z} from "zod"


export interface DiagnosisData{
    code:string,
    name: string,
    latin?: string
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosisData['code']>;
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

export interface PatientsData extends NewPatientsEntry{
        id: string;
        entries:Entry[]
}
 export interface Discharge {
    date: string;
    criteria: string;
  }
  
export  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
  }
  
export  interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
export  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
  }
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
  
export type NewPatientsEntry = z.infer<typeof NewEntrySchema>

export type NonSensitivePatientEntry = Omit<PatientsData,'ssn'|'entries'>;

export type NewPatientEntry = Omit<PatientsData,'id'|'entries'>


export enum Gender{
    Male="male",
    Female="female",
    Other="other"
}  