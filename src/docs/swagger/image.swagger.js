/**
 * @swagger
 * /images/update:
 *   patch:
 *     summary: Update user profile image
 *     description: Endpoint for updating user profile image (Authorized users only)
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Image successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photo:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "https://res.cloudinary.com/dcn2z7t55/image/upload/v1739197280/Space2Study-UA-1300-03/9bde63bc-b637-49c0-b97f-54b9885d591a/NAME:photo_2024-07-31_13-10-07.jpg/ID:67aa0b5b88f28e76b3deea86.jpg"
 *                     publicId:
 *                       type: string
 *                       example: "Space2Study-UA-1300-03/9bde63bc-b637-49c0-b97f-54b9885d591a/NAME:photo_2024-07-31_13-10-07.jpg/ID:67aa0b5b88f28e76b3deea86"
 *                 mainSubjects:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: array
 *                       items:
 *                         type: string
 *                     tutor:
 *                       type: array
 *                       items:
 *                         type: string
 *                 totalReviews:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: number
 *                       example: 0
 *                     tutor:
 *                       type: number
 *                       example: 0
 *                 averageRating:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: number
 *                       example: 0
 *                     tutor:
 *                       type: number
 *                       example: 0
 *                 status:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: string
 *                       example: "active"
 *                     tutor:
 *                       type: string
 *                       example: "active"
 *                     admin:
 *                       type: string
 *                       example: "active"
 *                 _id:
 *                   type: string
 *                   example: "67aa0b5b88f28e76b3deea86"
 *                 authProvider:
 *                   type: string
 *                   example: "local"
 *                 role:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["superadmin"]
 *                 firstName:
 *                   type: string
 *                   example: "SUPER_ADMIN"
 *                 lastName:
 *                   type: string
 *                   example: "Project-Based-1300&1301-03"
 *                 email:
 *                   type: string
 *                   example: "projectssteam03@gmail.com"
 *                 lastLogin:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-10T14:21:17.564Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-10T14:21:15.861Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-10T14:21:21.305Z"
 *       422:
 *         description: Validation Errors
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 422
 *                     code:
 *                       type: string
 *                       example: "FILE_IS_NOT_DEFINED"
 *                     message:
 *                       type: string
 *                       example: "Request file should not be null or undefined"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 422
 *                     code:
 *                       type: string
 *                       example: "BUFFER_IS_NOT_DEFINED"
 *                     message:
 *                       type: string
 *                       example: "Request buffer should not be null or undefined"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 422
 *                     code:
 *                       type: string
 *                       example: "FIELD_IS_NOT_OF_PROPER"
 *                     message:
 *                       type: string
 *                       description: Specific field validation error message
 *       502:
 *         description: Cloudinary Upload Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 502
 *                 code:
 *                   type: string
 *                   example: "BAD_GATEWAY_CLOUDINARY"
 *                 message:
 *                   type: string
 *                   example: "Upload error in Cloudinary."
 */
