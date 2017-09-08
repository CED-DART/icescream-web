import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://icescreamapi.azurewebsites.net/api/',
  headers: { 'Content-Type': 'application/json' }
})
