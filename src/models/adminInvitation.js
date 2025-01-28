import { Schema, model } from 'mongoose'
import { refs } from '#consts/models.js'

const { ADMIN_INVITATION } = refs

const adminInvitationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  dateOfInvitation: {
    type: Date,
    required: true,
    default: Date.now
  }
})

export default model(ADMIN_INVITATION, adminInvitationSchema)
