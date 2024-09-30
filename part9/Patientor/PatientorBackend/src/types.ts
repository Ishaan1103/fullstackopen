export interface DiagnosisData{
    code:string,
    name: string,
    latin?: string
}
export interface PatientsData{
        id: string,
        name: string,
        dateOfBirth: string,
        ssn: string,
        gender: string,
        occupation: string
}

export type NonSensitivePatientEntry = Omit<PatientsData,'ssn'>;

export type NewPatientEntry = Omit<PatientsData,'id'>


export enum Gender{
    Male="male",
    Female="female",
    Other="other"
}  