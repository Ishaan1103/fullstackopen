import express from 'express';
import diaryService from '../services/diaryService';
import toNewDairyEntry from '../utils'
import {z} from 'zod'

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diaryService.getNonSensitiveEntries())
});

router.get('/:id',(req,res)=>{
  const dairy = diaryService.findById(Number(req.params.id))
  if (dairy) {
    res.send(dairy)
  }
  else{
    res.status(404).send("Not found")
  }
})

router.post('/',(req,res)=>{
  try {
    const newDairyEntry = toNewDairyEntry(req.body)
    const addedEntry = diaryService.addDiary(newDairyEntry)
    res.json(addedEntry)
  } catch (error:unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
})

export default router;