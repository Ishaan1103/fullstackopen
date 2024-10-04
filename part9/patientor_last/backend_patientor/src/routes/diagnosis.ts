import { Request, Response, Router } from "express";
import { getAllDiagnoses } from "../controller/diagnoses";
import { getNonSenstiveData,addPatient, getSinglePatient, addEntry } from "../controller/patients";
import { Entry, Diagnoses } from "../types";

const router = Router()


router.get('/diagnoses',(_req,res)=>{
    res.send(getAllDiagnoses())
})

router.get('/patients',(_req,res)=>{
    res.send(getNonSenstiveData())
})
router.get('/patients/:id',(req:Request,res:Response)=>{
    const patient = getSinglePatient(req.params.id)
    if (patient) {
        res.json(patient)
    }
    else{
        res.status(404).send({error:'Not found'})
    }
})

router.post('/patients',(req,res)=>{
        const addedEntry = addPatient(req.body)
        res.json(addedEntry)
})

const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnoses['code']>;
    }
    return object.diagnosisCodes as Array<Diagnoses['code']>;
};

router.post('/patients/:id/entries', (req:Request,res:Response)=>{
    const patientId = req.params.id;
    const entry:Entry = req.body; 

    if ( !entry.type || !entry.date || !entry.description ) {
        res.status(400).send({ error: 'Missing required fields' });
    }

    entry.diagnosisCodes = parseDiagnosisCodes(req.body);

    try {
        const updatedPatient = addEntry(patientId, entry); 
        res.status(201).json(updatedPatient);
    } catch (error) {
        res.status(404).send({ error: 'Patient not found' });
    }
});


export default router