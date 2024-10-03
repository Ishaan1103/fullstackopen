import patientsData from "../../data/patients"
import { AddPatientEntry, NewPatientEntry, Patient } from "../types"
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

export {
    getPatients,
    getNonSenstiveData,
    addPatient,
    getSinglePatient
}