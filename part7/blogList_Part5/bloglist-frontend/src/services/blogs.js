import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const getAll = async () => {
  const respond = await axios.get(baseUrl)
  return respond.data
}

const create = async(newBlog) => {
  const config = {
    headers:{ Authorization: token },
  }
  const respond = await axios.post(baseUrl,newBlog,config)
  return respond.data
}

const update = async(id,newBlog) => {
  const respond = await axios.put(`${baseUrl}/${id}`,newBlog)
  return respond.data
}
const remove = async(id) => {
  const config = {
    headers:{ Authorization:token }
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}
const getComment = async(id)=>{
  const res = await axios.get(`${baseUrl}/${id}/comments`)
  return res.data
}
const addComment = async(id,newComment)=>{
  const res = await axios.post(`${baseUrl}/${id}/comments`,newComment)
  return res.data
}
export default { getAll, create, update, setToken, remove, getComment, addComment }