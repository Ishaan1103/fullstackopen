import { NewDairyEntry, Visibility, Weather } from "./types";
import {z} from 'zod'

export const toNewDairyEntry = (object:unknown): NewDairyEntry =>{
    return NewEntrySchema.parse(object)
}

export const NewEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
});
/*
const parseComment = (comment:unknown):string =>{
    return z.string().parse(comment)
}

const parseDate = (date:unknown):string =>{
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing data: '+date);
    }
    return date
}

const parseWeather =(weather:unknown):Weather=>{
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather)
    }
    return weather
} 

const parseVisibility = (visibility:unknown):Visibility =>{
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility)
    }
    return visibility
}

const isVisibility = (params:string):params is Visibility =>{
    return Object.values(Visibility).map(v=>v.toString()).includes(params)
}

const isWeather = (params:string):params is Weather =>{
    return Object.values(Weather).map(v=>v.toString()).includes(params)
}

const isString = (text:unknown):text is string =>{
    return typeof text === 'string' || text instanceof String;
}

const isDate =(date:string):boolean =>{
    return Boolean(Date.parse(date))
}
*/


export default toNewDairyEntry