import diagnoData from "../../data/diagnoses"
import { DiagnosisData } from "../types"

const dataset:DiagnosisData[] = diagnoData

const getAllDiagnoses =():DiagnosisData[] => {
    return dataset
}
export {
    getAllDiagnoses
}