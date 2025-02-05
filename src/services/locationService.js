import { errors } from '#consts/errors.js'

const API_BASE_URL = 'https://api.countrystatecity.in/v1'

const fetchFromAPI = async (url, apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: { 'X-CSCAPI-KEY': apiKey },
    })

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(errors.BAD_REQUEST.message)
      }
      if (response.status === 404) {
        throw new Error(errors.NOT_FOUND.message)
      }
      throw new Error(errors.FAILED_FETCH_LOCATIONS.message)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    throw new Error(errors.FAILED_FETCH_LOCATIONS.message)
  }
}

export const locationService = {
  getCountries: async (apiKey) => {
    if (!apiKey) throw new Error(errors.API_KEY_REQUIRED.message)
    const countries = await fetchFromAPI('/countries', apiKey)
    return countries.map(({ iso2, name }) => ({ iso2, name }))
  },

  getCities: async (countryCode, apiKey) => {
    if (!apiKey) throw new Error(errors.API_KEY_REQUIRED.message)
    if (!countryCode || !countryCode.trim()) throw new Error(errors.COUNTRY_CODE_REQUIRED.message)

    const cities = await fetchFromAPI(`/countries/${countryCode}/cities`, apiKey)
    return cities.map(({ name }) => ({ name }))
  }
}
