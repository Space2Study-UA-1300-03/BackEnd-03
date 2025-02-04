import { appearances } from '#consts/validation.js'
import { errors } from '#consts/errors.js'
import { Schema, model } from 'mongoose'
import { refs } from '#consts/models.js'

const { FIELD_CANNOT_BE_EMPTY } = errors
const { icon, color } = appearances
const { CATEGORY } = refs

const appearanceSchema = new Schema({
  icon: { type: String, default: icon },
  color: { type: String, default: color }
})

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, FIELD_CANNOT_BE_EMPTY('categoryName')]
    },
    appearance: appearanceSchema
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model(CATEGORY, categorySchema)
