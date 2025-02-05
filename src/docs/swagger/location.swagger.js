/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         iso2:
 *           type: string
 *           example: "UA"
 *         name:
 *           type: string
 *           example: "Ukraine"
 *
 *     City:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Kyiv"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "API_KEY_REQUIRED"
 *         message:
 *           type: string
 *           example: "API key is required"
 *       required:
 *         - code
 *         - message 
 */

/**
 * @swagger
 * tags:
 *   - name: Location
 *     description: API for retrieving countries and cities
 */

/**
 * @swagger
 * /locations/countries:
 *   get:
 *     summary: Get a list of countries
 *     tags: [Location]
 *     parameters:
 *       - in: header
 *         name: X-CSCAPI-KEY
 *         required: true
 *         schema:
 *           type: string
 *         description: API key required for authentication
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 *       400:
 *         description: API key is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Countries not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /locations/countries/{countryCode}/cities:
 *   get:
 *     summary: Get a list of cities by country code
 *     tags: [Location]
 *     parameters:
 *       - in: header
 *         name: X-CSCAPI-KEY
 *         required: true
 *         schema:
 *           type: string
 *         description: API key required for authentication
 *       - in: path
 *         name: countryCode
 *         required: true
 *         schema:
 *           type: string
 *         description: ISO2 country code (e.g., "UA" for Ukraine)
 *     responses:
 *       200:
 *         description: A list of cities for the specified country
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *       400:
 *         description: API key or country code is missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cities not found for the specified country
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
