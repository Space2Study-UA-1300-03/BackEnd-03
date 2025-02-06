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
