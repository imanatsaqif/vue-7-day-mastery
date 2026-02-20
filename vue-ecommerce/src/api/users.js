import axios from 'axios'

const USER_URL = 'https://fakestoreapi.com/users'

export const getUsersApi = async () => {
  const res = await axios.get(USER_URL)
  return res.data
}

export const getUserByIdApi = async (id) => {
  const res = await axios.get(`${USER_URL}/${id}`)
  return res.data
}

export const addUserApi = async (userData) => {
  const res = await axios.post(USER_URL, userData)
  return res.data
}
