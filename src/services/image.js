import { uniqueFileName } from '#utils/uniqueFileName.js'
import { lengths, photo } from '#consts/validation.js'
import { cloudinaryAccess } from '#configs/config.js'
import { createError } from '#utils/errorsHelper.js'
import { error } from '#consts/validationError.js'
import { v2 as cloudinary } from 'cloudinary'
import { logger } from '#logger/logger.js'
import streamifier from 'streamifier'
import User from '#models/user.js'
import sharp from 'sharp'

const { FILE_IS_NOT_DEFINED, BUFFER_IS_NOT_DEFINED, BAD_GATEWAY_CLOUDINARY } = error
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = cloudinaryAccess
const { CLOUDINARY_FOLDER, IMG_FIT, TO_FORMAT, IMG_QUALITY } = photo
const { IMG_H, IMG_W } = lengths

export const imageService = {
  updateImage: async (user, file) => {
    if (!file || !file.buffer) throw createError(422, FILE_IS_NOT_DEFINED)

    const uniqueName = uniqueFileName(file.originalname, user._id)

    const updatedBuffer = await bufferService.updatedBuffer(file.buffer)

    const { url, publicId } = await cloudinaryService.uploadBufferToCloudinary(updatedBuffer, uniqueName, user._id)

    const updatedUser = await User.findByIdAndUpdate(user._id, { photo: { url, publicId } }, { new: true })

    return updatedUser
  }
}

export const bufferService = {
  updatedBuffer: async (buffer) => {
    try {
      return await sharp(buffer)
        .resize({
          height: IMG_H,
          width: IMG_W,
          fit: IMG_FIT
        })
        .toFormat(TO_FORMAT)
        .jpeg({ quality: IMG_QUALITY })
        .toBuffer()
    } catch (error) {
      logger.error(error)
      throw createError(422)
    }
  }
}

export const cloudinaryService = {
  uploadBufferToCloudinary: async (buffer, uniqueName, userId) => {
    if (!buffer) throw createError(422, BUFFER_IS_NOT_DEFINED)

    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET
    })

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `${CLOUDINARY_FOLDER}/${userId}`,
          public_id: uniqueName
        },
        (error, result) => {
          if (error) {
            logger.error(error)
            return reject(createError(502, BAD_GATEWAY_CLOUDINARY))
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id
          })
        }
      )

      streamifier.createReadStream(buffer).pipe(uploadStream)
    })
  }
}
