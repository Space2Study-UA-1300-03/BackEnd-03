import { errors } from '#consts/errors.js'
import { locationService } from '#services/locationService.js'

export const getCountries = async (req, res) => {
  try {
    const apiKey = req.headers['x-cscapi-key']
    const countries = await locationService.getCountries(apiKey)
    res.json(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(error.message === errors.API_KEY_REQUIRED.message ? 400 : 500).json({ message: error.message })
  }
}

export const getCitiesByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params
    const apiKey = req.headers['x-cscapi-key']
    const cities = await locationService.getCities(countryCode, apiKey)
    res.json(cities)
  } catch (error) {
    console.error('Error fetching cities:', error)
    res.status(
      error.message === errors.API_KEY_REQUIRED.message || error.message === errors.COUNTRY_CODE_REQUIRED.message
        ? 400
        : 500
    ).json({ message: error.message })
  }
}
