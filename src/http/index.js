import axios from 'axios'

const getAPIUrl = (API_URL) => {
  if (API_URL !== undefined) {
    return API_URL
  }
  return 'http://localhost:5000/api/'
}

export const HTTP = axios.create({
  baseURL: getAPIUrl(process.env.API_URL),
  headers: { 'Content-Type': 'application/json' }
})
