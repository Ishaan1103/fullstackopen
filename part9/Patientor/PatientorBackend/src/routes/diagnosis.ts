import { Request, Response, NextFunction, Router } from "express";
import { getAllDiagnoses } from "../controller/diagnoses";
import { getNonSenstiveData,addPatient, getSinglePatient } from "../controller/patients";
import { NewEntrySchema } from '../utils'
import { NewPatientsEntry, PatientsData } from "../types";
import {z} from 'zod'
import { error } from "console";

const router = Router()

const newPatientParser = (req:Request,res:Response,next:NextFunction) =>{
    try {
        NewEntrySchema.parse(req.body);
        next();
    } 
    catch(error:unknown){
        next(error)
    }
}

const errorMiddleware = (error:unknown,_req:Request,res:Response,next:NextFunction)=>{
    if (error instanceof z.ZodError) {
        res.status(400).send({error: error.issues})
    }
    else{
        next(error);
    }
}


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

router.post('/patients',newPatientParser,(req:Request<unknown,unknown,NewPatientsEntry>,res:Response<PatientsData>)=>{
        const addedEntry = addPatient(req.body)
        res.json(addedEntry)
})

router.use(errorMiddleware)

export default router