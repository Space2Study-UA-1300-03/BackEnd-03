import { errors } from '#consts/errors.js'
import { config } from '#configs/config.js'

const API_BASE_URL = 'https://api.countrystatecity.in/v1'

const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: { 'X-CSCAPI-KEY': config.CSC_API_KEY },
    })

    if (!response.ok) {
      const errorMessage =
        response.status === 400
          ? errors.BAD_REQUEST.message
          : response.status === 404
            ? errors.NOT_FOUND.message
            : errors.FAILED_FETCH_LOCATIONS.message

      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    throw error
  }
}

export const locationService = {
  getCountries: async () => {
    const countries = await fetchFromAPI('/countries')
    if (!countries.length) throw new Error(errors.NOT_FOUND.message)
    return countries.map(({ iso2, name }) => ({ iso2, name }))
  },

  getCities: async (countryCode) => {
    if (!countryCode || !countryCode.trim()) throw new Error(errors.COUNTRY_CODE_REQUIRED.message)

    const cities = await fetchFromAPI(`/countries/${countryCode}/cities`)
    if (!cities.length) throw new Error(errors.NOT_FOUND.message) 
    return cities.map(({ name }) => ({ name }))
  }
}
