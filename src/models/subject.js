import { errors } from '#consts/errors.js'
import { Schema, model } from 'mongoose'
import { refs } from '#consts/models.js'

const { FIELD_CANNOT_BE_EMPTY } = errors
const { SUBJECT, CATEGORY } = refs

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('name')],
      lowercase: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: CATEGORY,
      required: [true, FIELD_CANNOT_BE_EMPTY('category')]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model(SUBJECT, subjectSchema)
