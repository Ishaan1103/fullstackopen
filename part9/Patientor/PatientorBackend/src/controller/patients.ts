import patientsData from "../../data/patients"
import { PatientsData, NonSensitivePatientEntry,NewPatientEntry } from "../types"
import {v1 as uuid} from 'uuid'
const dataset:PatientsData[] = patientsData

const getPatients = ():PatientsData[] => {
    return dataset
}
const getNonSenstiveData = ():NonSensitivePatientEntry[]=>{
    return dataset.map(({id,
        name,
        dateOfBirth,
        gender,
        occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (entries:NewPatientEntry):PatientsData =>{
const newPatientEntry ={
    id:uuid(),
    ...entries
    }
    dataset.push(newPatientEntry)
    return newPatientEntry
}


export {
    getPatients,
    getNonSenstiveData,
    addPatient
}