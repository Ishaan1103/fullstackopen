import { Request, Response, Router } from "express";
import { getAllDiagnoses } from "../controller/diagnoses";
import { getNonSenstiveData,addPatient, getSinglePatient } from "../controller/patients";

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


export default router