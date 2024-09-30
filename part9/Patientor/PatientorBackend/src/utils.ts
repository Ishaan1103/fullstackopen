import { NewPatientEntry, Gender } from "./types";

const toNewPatientEntry = (object:unknown):NewPatientEntry =>{
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        }
        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing');
}


const parseName = (name:unknown):string =>{
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name')
    }
    return name
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

export default toNewPatientEntry