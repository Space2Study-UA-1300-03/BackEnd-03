import { photo } from '#consts/validation.js'
import multer from 'multer'

const { FILE_SIZE, FIELDNAME_SIZE } = photo

const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: {
    fileSize: FILE_SIZE,
    fieldNameSize: FIELDNAME_SIZE
  }
})
