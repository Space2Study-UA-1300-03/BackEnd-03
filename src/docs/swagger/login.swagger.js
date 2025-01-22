/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           pattern: '^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$'
 *           description: Valid email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           pattern: '^(?=.*\d)(?=.*[a-zа-яєії])\S+$'
 *           minLength: 8
 *           maxLength: 25
 *           description: Password must contain at least one letter and one number
 *           example: "Password123"
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication user
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authorize user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTE3ZDVhMTBmYTU5ODk2ZjMzZTQ2YSIsInJvbGUiOiJzdHVkZW50IiwiaXNGaXJzdExvZ2luIjp0cnVlLCJpYXQiOjE3Mzc1ODgxNjYsImV4cCI6MTczNzU5MTc2Nn0.EDBILzuP2wvCJ6NUmRH8EQP2r-2eGWjoSUXvl2Y6-qo"
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 message:
 *                   type: string
 *             examples:
 *               USER_NOT_FOUND:
 *                 value:
 *                   code: "USER_NOT_FOUND"
 *                   message: "User with the specified email was not found."
 *               EMAIL_NOT_CONFIRMED:
 *                 value:
 *                   code: "EMAIL_NOT_CONFIRMED"
 *                   message: "Please confirm your email to login."
 *               INCORRECT_CREDENTIALS:
 *                 value:
 *                   code: "INCORRECT_CREDENTIALS"
 *                   message: "The password you entered is incorrect."
 *       422:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   message:
 *                     type: string
 *             examples:
 *               FIELD_IS_NOT_DEFINED:
 *                 value:
 *                   - code: "FIELD_IS_NOT_DEFINED"
 *                     message: "${field} should not be null or undefined."
 *               FIELD_IS_NOT_OF_PROPER_TYPE:
 *                 value:
 *                   - code: "FIELD_IS_NOT_OF_PROPER_TYPE"
 *                     message: "${field} should be of type ${type}."
 *               FIELD_IS_NOT_OF_PROPER_LENGTH:
 *                 value:
 *                   - code: "FIELD_IS_NOT_OF_PROPER_LENGTH"
 *                     message: "${field} cannot be shorter than ${length.min} and longer than ${length.max} characters."
 *               FIELD_IS_NOT_OF_PROPER_FORMAT:
 *                 value:
 *                   - code: "FIELD_IS_NOT_OF_PROPER_FORMAT"
 *                     message: "${field} can contain alphabetic characters only."
 *               FIELD_IS_NOT_OF_PROPER_ENUM_VALUE:
 *                 value:
 *                   - code: "FIELD_IS_NOT_OF_PROPER_ENUM_VALUE"
 *                     message: "${field} should be either one of the values: [${enumSet.join(', ')}]."
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 message:
 *                   type: string
 *             examples:
 *               DOCUMENT_NOT_FOUND:
 *                 value:
 *                   code: "DOCUMENT_NOT_FOUND"
 *                   message: "The language name is invalid. Possible options: ${APP_LANG_ENUM.join(', ')}."
 */
