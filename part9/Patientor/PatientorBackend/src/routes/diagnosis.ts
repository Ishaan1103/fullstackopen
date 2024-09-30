import { Router } from "express";
import { getAllDiagnoses } from "../controller/diagnoses";
import { getNonSenstiveData,addPatient } from "../controller/patients";
import toNewPatientEntry from '../utils'
const router = Router()

router.get('/diagnoses',(_req,res)=>{
    res.send(getAllDiagnoses())
})

router.get('/patients',(_req,res)=>{
    res.send(getNonSenstiveData())
})

router.post('/patients',(req,res)=>{
    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const addedEntry = addPatient(newPatientEntry)
        res.json(addedEntry)
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.'
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message
        }
        res.status(400).send(errorMessage)
    }
})

export default router