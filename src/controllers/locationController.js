import { errors } from '#consts/errors.js'
import { locationService } from '#services/locationService.js'

export const getCountries = async (req, res) => {
  try {
    const countries = await locationService.getCountries()
    res.json(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    const status =
      error.message === errors.NOT_FOUND.message || error.message === errors.BAD_REQUEST.message ? 400 : 500
    res.status(status).json({ message: error.message })
  }
}

export const getCitiesByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params
    const cities = await locationService.getCities(countryCode)
    res.json(cities)
  } catch (error) {
    console.error('Error fetching cities:', error)
    const status =
      error.message === errors.COUNTRY_CODE_REQUIRED.message || error.message === errors.NOT_FOUND.message
        ? 400
        : 500
    res.status(status).json({ message: error.message })
  }
}
