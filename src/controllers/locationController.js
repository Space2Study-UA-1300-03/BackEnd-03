import { errors } from '#consts/errors.js'
import { locationService } from '#services/locationService.js'

export const getCountries = async (req, res) => {
  try {
    const apiKey = req.headers['x-cscapi-key']
    if (!apiKey) {
      return res.status(400).json(errors.API_KEY_REQUIRED)
    }

    const countries = await locationService.getCountries(apiKey)
    res.json(countries.map(({ iso2, name }) => ({ iso2, name })))
  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(500).json(errors.FAILED_FETCH_LOCATIONS)
  }
}

export const getCitiesByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params
    const apiKey = req.headers['x-cscapi-key']

    if (!apiKey) {
      return res.status(400).json(errors.API_KEY_REQUIRED)
    }
    if (!countryCode || !countryCode.trim()) {
      return res.status(400).json(errors.COUNTRY_CODE_REQUIRED)
    }

    const cities = await locationService.getCities(countryCode, apiKey)
    res.json(cities.map(({ name }) => ({ name })))
  } catch (error) {
    console.error('Error fetching cities:', error)
    res.status(500).json(errors.FAILED_FETCH_LOCATIONS)
  }
}
