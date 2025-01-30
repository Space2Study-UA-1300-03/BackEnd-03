/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication user
 */

/**
 * @swagger
 * /auth/confirm-email/{token}:
 *   post:
 *     summary: Email verify new user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
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
 *                   example: "BAD_CONFIRM_TOKEN"
 *                 message:
 *                   type: string
 *                   example: "The confirm token is either invalid or has expired."
 */
