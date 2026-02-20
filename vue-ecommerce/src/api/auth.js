import axios from 'axios'

const AUTH_URL = 'https://fakestoreapi.com/auth/login'

export const loginApi = async (username, password) => {
  const res = await axios.post(AUTH_URL, { username, password })
  return res.data
}
