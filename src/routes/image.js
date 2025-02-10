import { imageValidationSchema } from '#validation/schemas/image.js'
import { fileValidation } from '#middlewares/dataValidation.js'
import { asyncWrapper } from '#middlewares/asyncWrapper.js'
import { updateImage } from '#controllers/image.js'
import { upload } from '#middlewares/multer.js'
import express from 'express'

export const router = express.Router()

router.patch('/update', upload.single('photo'), fileValidation(imageValidationSchema), asyncWrapper(updateImage))
