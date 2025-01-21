/**
 * @swagger
 * tags:
 *   - name: Utility
 *     description: Server Health Check
 *
 * /ping:
 *   get:
 *     summary: Responds with a pong message
 *     tags: [Utility]
 *     responses:
 *       200:
 *         description: A JSON object with a pong message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */
