import axios from 'axios'
import { Dairy, NewDairy } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAllData = async() =>{
    const response = await axios.get<Dairy[]>(baseUrl)
    return response.data
}

const addData = async(object:NewDairy)=>{
    const response = await axios.post<Dairy[]>(baseUrl,object)
    return response.data
}
export {
    getAllData,
    addData
}