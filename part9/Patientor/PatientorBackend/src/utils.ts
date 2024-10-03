import { z } from "zod";
import { NewPatientEntry, Gender, HealthCheckEntrySchema } from "./types";

export const toNewPatientEntry = (object:unknown):NewPatientEntry =>{
        return NewEntrySchema.parse(object)
}
const EntrySchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema
  ]);
export const NewEntrySchema = z.object({
        name: z.string(),
        dateOfBirth: z.string().date(),
        ssn: z.string(),
        gender: z.nativeEnum(Gender),
        occupation: z.string(),
        entries:z.array(EntrySchema).default([])
    })

    const HospitalEntrySchema = BaseEntrySchema.extend({
        type: z.literal("Hospital"),
        discharge: z.object({
          date: z.string().date(),
          criteria: z.string()
        })
      });
      
      const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
        type: z.literal("OccupationalHealthcare"),
        employerName: z.string(),
        sickLeave: z
          .object({
            startDate: z.string().date(),
            endDate: z.string().date()
          })
          .optional()
      });

/*
const parseName = (name:unknown):string =>{
    return z.string().parse(name)
}
const parseOccupation = (occupation:unknown):string =>{
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation')
    }
    return occupation
}

const parseDate = (date:unknown):string =>{
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date)
    }
    return date
}

const parseSsn = (ssn:unknown):string=>{
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn")
    }
    return ssn
}

const parseGender = (gender:unknown):string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender
}

const isGender = (params:string):params is Gender=>{
    return Object.values(Gender).map(v=>v.toString()).includes(params)
}

const isDate = (date:string):boolean =>{
    return Boolean(Date.parse(date))
}

const isString = (text:unknown):text is string =>{
    return typeof text === 'string' || text instanceof String
}
*/
export default toNewPatientEntry