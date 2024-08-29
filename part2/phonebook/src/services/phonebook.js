import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll =()=>{
    const response = axios.get(baseUrl)
    return response.then((res)=>res.data)
}
const create=(addPerson)=>{
    const response = axios.post(baseUrl,addPerson)
    return response.then(res => res.data)
}
const remove = (deleteUser) =>{
    if(window.confirm(`Do you want to delete ${deleteUser.name}?`)){
        const response = axios.delete(`${baseUrl}/${deleteUser.id}`)
        return response;
    }
}
const update = (updateUsr,newObject)=>{
    const response = axios.put(`${baseUrl}/${updateUsr.id}`,newObject)
    return response.then((res)=>{
        return res.data;
    }
)
}
export default {getAll, create, remove, update}