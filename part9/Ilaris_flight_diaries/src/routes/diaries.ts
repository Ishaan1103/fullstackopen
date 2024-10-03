import express, { Request, Response, NextFunction   } from 'express';
import diaryService from '../services/diaryService';
import { NewEntrySchema } from '../utils'
import { NewDairyEntry,DiaryEntry } from '../types';
import {z} from 'zod'


const router = express.Router();

const newDairyParser = (req:Request,_res:Response,next:NextFunction)=>{
  try{
    NewEntrySchema.parse(req.body)
    next()
  }
  catch(error:unknown){
    next(error)
  }
}

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
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

router.post('/', newDairyParser, (req: Request<unknown, unknown, NewDairyEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry)
})


router.use(errorMiddleware)

export default router;