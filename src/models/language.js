import { Schema, model } from 'mongoose'
import { refs } from '#consts/models.js'

const { LANGUAGE } = refs

const languageSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Language name cannot be empty'],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model(LANGUAGE, languageSchema)
