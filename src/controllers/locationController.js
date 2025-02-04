import axios from 'axios'
import { config } from '#configs/config.js'

const API_URL = 'https://api.countrystatecity.in/v1'
const HEADERS = { 'X-CSCAPI-KEY': config.CSC_API_KEY }

export const getCountries = async (req, res) => {  
  try {
    const response = await axios.get(`${API_URL}/countries`, { headers: HEADERS })
      
    const countries = response.data.map((country) => ({
      iso2: country.iso2,
      name: country.name,
    }))
  
    res.json(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(500).json({ message: 'Error fetching countries', error: error.message })
  }
}
  

export const getCitiesByCountry = async (req, res) => {
  const { countryCode } = req.params

  if (!countryCode) {
    return res.status(400).json({ message: 'Country code is required' })
  }

  try {
    const response = await axios.get(`${API_URL}/countries/${countryCode}/cities`, { headers: HEADERS })
    
    const cities = response.data.map((city) => ({
      name: city.name,
    }))

    res.json(cities)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities', error: error.message })
  }
}
