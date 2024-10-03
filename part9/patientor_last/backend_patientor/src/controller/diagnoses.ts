import diagnoData from "../../data/diagnoses"
import { Diagnoses } from "../types"

const dataset:Diagnoses[] = diagnoData

const getAllDiagnoses =():Diagnoses[] => {
    return dataset
}
export {
    getAllDiagnoses
}