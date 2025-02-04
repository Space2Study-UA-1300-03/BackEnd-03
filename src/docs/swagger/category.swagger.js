/**
 * @swagger
 * components:
 *   schemas:
 *     Appearance:
 *       type: object
 *       properties:
 *         icon:
 *           type: string
 *           description: Icon identifier for the category
 *         color:
 *           type: string
 *           description: Color code for the category styling
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
 */
