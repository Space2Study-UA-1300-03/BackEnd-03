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
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
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
 *         description: Bad request, country code is required
 *       500:
 *         description: Internal server error
 */
