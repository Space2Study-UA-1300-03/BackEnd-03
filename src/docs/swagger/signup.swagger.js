/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - role
 *       properties:
 *         firstName:
 *           type: string
 *           pattern: '^[a-zа-яєії]+$'
 *           minLength: 1
 *           maxLength: 30
 *           description: User's first name using only letters
 *           example: "John"
 *         lastName:
 *           type: string
 *           pattern: '^[a-zа-яєії]+$'
 *           minLength: 1
 *           maxLength: 30
 *           description: User's last name using only letters
 *           example: "Doe"
 *         email:
 *           type: string
 *           pattern: '^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$'
 *           description: Valid email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           pattern: '^(?=.*\d)(?=.*[a-zа-яєії])\S+$'
 *           minLength: 8
 *           maxLength: 25
 *           description: Password must contain at least one letter and one number
 *           example: "Password123"
 *         role:
 *           type: string
 *           enum: [student, tutor, admin, superadmin]
 *           description: User's role in the system
 *           example: "student"
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication user
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "CREATED"
 *                 userId:
 *                   type: string
 *                   example: "678c28639d1901a26da8958d"
 *                 userEmail:
 *                   type: string
 *                   example: "mustafa_hane54@example.org"
 *       400:
 *         description: Invalid language provided
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
 *                   example: "INVALID_LANGUAGE"
 *                 message:
 *                   type: string
 *                   example: "The language name is invalid. Possible options: ['en', 'ua']"
 *       409:
 *         description: User already exists
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
 *                   example: "ALREADY_REGISTERED"
 *                 message:
 *                   type: string
 *                   example: "User with the specified email already exists."
 *       422:
 *         description: Invalid role provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 422
 *                 code:
 *                   type: string
 *                   example: "FIELD_IS_NOT_OF_PROPER_ENUM_VALUE"
 *                 message:
 *                   type: string
 *                   example: "role should be either one of the values: [student, tutor, admin, superadmin]"
 */
