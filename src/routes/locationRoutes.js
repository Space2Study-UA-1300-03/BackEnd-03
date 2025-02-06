import express from 'express'
import { getCountries, getCitiesByCountry } from '#controllers/locationController.js'

export const router = express.Router()

router.get('/countries', getCountries)
router.get('/countries/:countryCode/cities', getCitiesByCountry)

export default router
