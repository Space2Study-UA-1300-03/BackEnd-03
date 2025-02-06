import { errors } from '#consts/errors.js'
import { config } from '#configs/config.js'
import NodeCache from 'node-cache'

export const cache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 60 * 60 })

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
    const cacheKey = 'countries'
    const cachedCountries = cache.get(cacheKey)
  
    if (cachedCountries) {
      console.log('✅ Returning countries from cache')
      return cachedCountries
    }
  
    const countries = await fetchFromAPI('/countries')
    if (!countries.length) throw new Error(errors.NOT_FOUND.message)
  
    const formattedCountries = countries.map(({ iso2, name }) => ({ iso2, name }))
  
    cache.set(cacheKey, formattedCountries)
    return formattedCountries
  },
  
  getCities: async (countryCode) => {
    if (!countryCode || !countryCode.trim()) throw new Error(errors.COUNTRY_CODE_REQUIRED.message)
  
    const cacheKey = `cities_${countryCode}`
    const cachedCities = cache.get(cacheKey)
  
    if (cachedCities) {
      console.log(`✅ Returning cities for ${countryCode} from cache`)
      return cachedCities
    }
  
    const cities = await fetchFromAPI(`/countries/${countryCode}/cities`)
    if (!cities.length) throw new Error(errors.NOT_FOUND.message)
  
    const formattedCities = cities.map(({ name }) => ({ name }))
  
    cache.set(cacheKey, formattedCities)
    return formattedCities
  }
}
