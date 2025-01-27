/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           pattern: '^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$'
 *           description: Valid email address
 *           example: "user@example.com"
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       204:
 *         description: Password reset email sent successfully
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
 *               USER_NOT_FOUND:
 *                 value:
 *                   code: "USER_NOT_FOUND"
 *                   message: "User with the specified email was not found."
 *               INVALID_TOKEN_NAME:
 *                 value:
 *                   code: "INVALID_TOKEN_NAME"
 *                   message: "The token name you used is invalid."
 *               TEMPLATE_NOT_FOUND:
 *                 value:
 *                   code: "TEMPLATE_NOT_FOUND"
 *                   message: "The requested template was not found."
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
 *       400:
 *         description: Invalid request
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
 *               EMAIL_NOT_SENT:
 *                 value:
 *                   - code: "EMAIL_NOT_SENT"
 *                     message: "Email has not been sent."
 *               API_TOKEN_NOT_RETRIEVED:
 *                 value:
 *                   - code: "API_TOKEN_NOT_RETRIEVED"
 *                     message: "The access token has not been retrieved."
 *               INVALID_LANGUAGE:
 *                 value:
 *                   code: "INVALID_LANGUAGE"
 *                   message: "The language name is invalid. Possible options: ['en', 'ua']"
 *
 */
