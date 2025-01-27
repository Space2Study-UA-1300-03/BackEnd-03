/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully refreshed tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New JWT access token
 *       400:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "BAD_REFRESH_TOKEN"
 *                 message:
 *                   type: string
 *                   example: "The refresh token is either invalid or has expired."
 *       401:
 *         description: No refresh token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Empty response body with cleared access token cookie
 */
