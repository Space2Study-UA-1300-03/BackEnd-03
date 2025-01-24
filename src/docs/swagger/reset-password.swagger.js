/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 25
 *           pattern: '^(?=.*\d)(?=.*[a-zа-яєії])\S+$'
 *           description: Password must contain at least one letter and one number
 *           example: "NewPassword123"
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   patch:
 *     summary: Reset user password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       204:
 *         description: Password successfully reset
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
 */
