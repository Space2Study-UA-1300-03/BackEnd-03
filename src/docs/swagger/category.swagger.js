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
 *                 $ref: '#/components/schemas/Category'
 */
