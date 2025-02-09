/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "63a9028379d14b2a4619b5b"
 *         name:
 *           type: string
 *           example: "English"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-02-09T19:31:14.981Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-02-09T19:31:14.981Z"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "NOT_FOUND"
 *         message:
 *           type: string
 *           example: "No languages found in the database."
 *       required:
 *         - code
 *         - message
 */

/**
 * @swagger
 * tags:
 *   - name: Languages
 *     description: API for managing and retrieving languages
 */

/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Get a list of all available languages
 *     tags: [Languages]
 *     responses:
 *       200:
 *         description: A list of available languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *       404:
 *         description: No languages found in the database  
 *       500:
 *         description: Internal server error
 */
