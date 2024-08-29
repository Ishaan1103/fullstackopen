import axios from 'axios'
const baseUrl = '/api/login'

const login = async(credentials) => {
  const response = await axios.post(baseUrl,credentials)
  return response.data
}
const allUsers = async()=>{
  const res = await axios.get('http://localhost:3001/api/users')
  return res.data
}
export default { login, allUsers }