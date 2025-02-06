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
