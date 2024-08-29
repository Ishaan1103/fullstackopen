import axios from "axios"

const baseUrl = 'http://localhost:3001/notes'

const getAll = async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (contents)=>{
    const object = {content:contents,important:false}
    const response = await axios.post(baseUrl,object)
    return response.data
}
export default {getAll,createNew}