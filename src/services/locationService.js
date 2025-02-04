import axios from 'axios'
import { createError } from '#utils/errorsHelper.js'
import dotenv from 'dotenv'

dotenv.config()

const API_BASE_URL = 'https://api.countrystatecity.in/v1'
const API_KEY = process.env.CSC_API_KEY

const fetchFromAPI = async (url) => {  
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, {
      headers: { 'X-CSCAPI-KEY': API_KEY },
    })
  
    return response.data
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    throw createError(500, 'Failed to fetch location data')
  }
}

export const locationService = {
  getCountries: async () => fetchFromAPI('/countries'),
  getCities: async (countryCode, stateCode) => fetchFromAPI(`/countries/${countryCode}/states/${stateCode}/cities`),
}
