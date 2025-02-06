/**
 * @swagger
 * components:
 *   schemas:
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
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 422
 *         code:
 *           type: string
 *           example: FIELD_IS_NOT_OF_PROPER
 *         message:
 *           type: string
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
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: Category name (3-30 characters)
 *               icon:
 *                 type: string
 *                 description: Optional icon identifier
 *               color:
 *                 type: string
 *                 description: Optional color code
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67a3de0313a740c4c31afe93
 *                 categoryName:
 *                   type: string
 *                   example: asdasss
 *                 appearance:
 *                   type: object
 *                   properties:
 *                     icon:
 *                       type: string
 *                       example: mocked-path-to-icon
 *                     color:
 *                       type: string
 *                       example: "#66c42c"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-02-05T21:54:11.826Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-02-05T21:54:11.826Z
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValidationError'
 *               examples:
 *                 required:
 *                   value:
 *                     - status: 422
 *                       code: FIELD_IS_NOT_OF_PROPER
 *                       message: 'Validation error: Required at "categoryName"'
 *                 invalid:
 *                   value:
 *                     - status: 422
 *                       code: FIELD_IS_NOT_OF_PROPER
 *                       message: 'Validation error: at categoryName'
 *       409:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 code:
 *                   type: string
 *                   example: CATEGORY_ALREADY_EXISTS
 *                 message:
 *                   type: string
 *                   example: Category with the specified name already exists.
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

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appearance:
 *                   type: object
 *                   properties:
 *                     icon:
 *                       type: string
 *                       example: mocked-path-to-icon
 *                     color:
 *                       type: string
 *                       example: "#66C42C"
 *                 _id:
 *                   type: string
 *                   example: 67a33bd69f614b613105e425
 *                 categoryName:
 *                   type: string
 *                   example: math
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-02-04T15:22:26.099Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-02-04T15:22:26.099Z
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 code:
 *                   type: string
 *                   example: INVALID_ID
 *                 message:
 *                   type: string
 *                   example: ID is invalid.
 *       404:
 *         description: Category not found
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

/**
 * @swagger
 * /categories/names:
 *   get:
 *     summary: Get category names and IDs
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of category names and IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 67a33bd69f614b613105e425
 *                   categoryName:
 *                     type: string
 *                     example: math
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
