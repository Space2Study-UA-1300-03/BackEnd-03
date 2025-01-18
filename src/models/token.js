import { Schema, model } from 'mongoose'
import { refs } from '#consts/models.js'

const { USER, TOKEN } = refs

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: USER
  },
  refreshToken: {
    type: String,
    required: false
  },
  resetToken: {
    type: String,
    required: false,
    default: null
  },
  confirmToken: {
    type: String,
    required: false
  }
})

export default model(TOKEN, tokenSchema)
