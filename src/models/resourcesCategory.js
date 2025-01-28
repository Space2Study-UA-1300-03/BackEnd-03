import { errors } from '#consts/errors.js'
import { Schema, model } from 'mongoose'
import { refs } from '#consts/models.js'

const { FIELD_CANNOT_BE_EMPTY, FIELD_CANNOT_BE_LONGER, FIELD_CANNOT_BE_SHORTER } = errors
const { USER, RESOURCES_CATEGORY } = refs

const resourcesCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('name')],
      minLength: [1, FIELD_CANNOT_BE_SHORTER('name', 1)],
      maxLength: [50, FIELD_CANNOT_BE_LONGER('name', 50)]
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: [true, FIELD_CANNOT_BE_EMPTY('author')]
    }
  },
  { timestamps: true, versionKey: false }
)

export default model(RESOURCES_CATEGORY, resourcesCategorySchema)
