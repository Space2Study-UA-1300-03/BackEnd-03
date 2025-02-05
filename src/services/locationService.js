import { errors } from '#consts/errors.js'

const API_BASE_URL = 'https://api.countrystatecity.in/v1'

const fetchFromAPI = async (url, apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: { 'X-CSCAPI-KEY': apiKey },
    })

    if (!response.ok) {
      throw new Error(errors.FAILED_FETCH_LOCATIONS.message)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    throw new Error(errors.FAILED_FETCH_LOCATIONS.message)
  }
}

export const locationService = {
  getCountries: async (apiKey) => fetchFromAPI('/countries', apiKey),
  getCities: async (countryCode, apiKey) => fetchFromAPI(`/countries/${countryCode}/cities`, apiKey),
}
