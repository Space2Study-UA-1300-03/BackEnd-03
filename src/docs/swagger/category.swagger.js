/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *         subjectId:
 *           type: string
 *           description: Unique identifier of the subject
 *         name:
 *           type: string
 *           description: Name of the subject (lowercase)
 *
 *     Appearance:
 *       type: object
 *       properties:
 *         icon:
 *           type: string
 *           description: Icon identifier for the category (lowercase)
 *         color:
 *           type: string
 *           description: Color code for the category styling (lowercase)
 *
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the category
 *         categoryName:
 *           type: string
 *           description: Name of the category (unique, lowercase)
 *         subjects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subject'
 *         appearance:
 *           $ref: '#/components/schemas/Appearance'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of category creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last category update
 */

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management operations
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appearance:
 *                     type: object
 *                     properties:
 *                       icon:
 *                         type: string
 *                         example: mocked-path-to-icon
 *                       color:
 *                         type: string
 *                         example: "#66C42C"
 *                   _id:
 *                     type: string
 *                     example: 67a25c69d017c62d30111eb1
 *                   categoryName:
 *                     type: string
 *                     example: math
 *                   subjects:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 67a25154d017c62d30111e99
 *                         name:
 *                           type: string
 *                           example: algebra
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-02-04T15:22:26.099Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-02-04T15:22:26.099Z
 *       404:
 *         description: Categories not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 code:
 *                   type: string
 *                   example: CATEGORY_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Categories was not found.
 */
