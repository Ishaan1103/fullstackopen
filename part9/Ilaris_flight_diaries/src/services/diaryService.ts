import diaries from '../../data/entries';
import { NewDairyEntry,DiaryEntry, NonSensitiveDiaryEntry } from '../types';


const getEntries = ():DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries =():NonSensitiveDiaryEntry[]=>{
  return diaries.map(({id,date,weather,visibility})=>({
    id,
    date,
    weather,
    visibility
  }))
}

const findById= (id:number):DiaryEntry | undefined =>{
  const entry = diaries.find(d => d.id === id)
  return entry;
}

const addDiary = (entry:NewDairyEntry):DiaryEntry =>{
  const newDataEntries = {
    id:Math.max(...diaries.map(d=>d.id))+1,
    ...entry
  }
  diaries.push(newDataEntries)
  return newDataEntries
}


export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addDiary
};