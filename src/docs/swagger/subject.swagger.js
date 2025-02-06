/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the subject
 *         name:
 *           type: string
 *           description: Name of the subject (lowercase)
 *         category:
 *           type: string
 *           format: uuid
 *           description: Reference to the category this subject belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of subject creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last subject update
 */

/**
 * @swagger
 * tags:
 *   - name: Subjects
 *     description: Subjects management operations
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: List of all subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: uuid
 *                     example: "67a48d5c26fc9e228d5a67d9"
 *                   subjectName:
 *                     type: string
 *                     description: Name of the subject (lowercase)
 *                     example: "physics"
 *                   categoryId:
 *                     type: string
 *                     format: uuid
 *                     description: Reference to the category
 *                     example: "67a48d5626fc9e228d5a67d6"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-06T10:22:20.706Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-06T10:22:20.706Z"
 */

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subjectName
 *               - categoryId
 *             properties:
 *               subjectName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: Name of the subject (will be converted to lowercase and trimmed)
 *                 example: "math"
 *               categoryId:
 *                 type: string
 *                 description: ID of the existing category (will be converted to lowercase and trimmed)
 *                 example: "67a498bc0b8af89844264247"
 *     responses:
 *       201:
 *         description: Subject successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   format: uuid
 *                   example: "67a498cb0b8af8984426424d"
 *                 subjectName:
 *                   type: string
 *                   example: "math"
 *                 categoryId:
 *                   type: string
 *                   format: uuid
 *                   example: "67a498bc0b8af89844264247"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-06T11:11:07.950Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-06T11:11:07.950Z"
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
 *                   example: "INVALID_ID"
 *                 message:
 *                   type: string
 *                   example: "The ID is either invalid."
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
 *                   example: "CATEGORY_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Categories was not found."
 */
