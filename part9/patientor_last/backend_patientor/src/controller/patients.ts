import patientsData from "../../data/patients"
import { AddPatientEntry, Entry, NewPatientEntry, Patient } from "../types"
import {v1 as uuid} from 'uuid'
const dataset:Patient[] = patientsData

const getPatients = ():Patient[] => {
    return dataset
}
const getNonSenstiveData = ():NewPatientEntry[]=>{
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

const addPatient = (entries:AddPatientEntry):Patient =>{
const newPatientEntry ={
    id:uuid(),
    entries:[],
    ...entries
    }
    dataset.push(newPatientEntry)
    return newPatientEntry
}

const getSinglePatient = (id:string):Patient|undefined => {
    return dataset.find(d => d.id === id)
}
const addEntry = (patientId: string, entry: Entry): Patient => {
    const patient = getSinglePatient(patientId);
    if (!patient) {
        throw new Error('Patient not found');
    }
    const dataEntry = {
        ...entry,
        id:uuid()
    }
    patient.entries.push(dataEntry); 
    return patient;
};

export {
    getPatients,
    getNonSenstiveData,
    addPatient,
    getSinglePatient,
    addEntry
}