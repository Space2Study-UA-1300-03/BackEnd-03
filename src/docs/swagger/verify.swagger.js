/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication user
 */

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Email verify new user
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: confirmToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 code:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Email confirmed"
 *       400:
 *         description: Invalid or expired reset token
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
 *                   example: "BAD_RESET_TOKEN"
 *                 message:
 *                   type: string
 *                   example: "The reset token is either invalid or has expired."
 */
