import { enums } from '#consts/validation.js'
import { errors } from '#consts/errors.js'
import { refs } from '#consts/models.js'
import { Schema, model } from 'mongoose'

const { MAIN_ROLE_ENUM, SPOKEN_LANG_ENUM, PROFICIENCY_LEVEL_ENUM, OFFER_STATUS_ENUM } = enums
const { OFFER, USER, SUBJECT, CATEGORY } = refs
const { ENUM_CAN_BE_ONE_OF } = errors

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },

    aboutAuthor: {
      author: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true,
        index: true
      },
      authorRole: {
        type: String,
        enum: {
          values: MAIN_ROLE_ENUM,
          message: ENUM_CAN_BE_ONE_OF('author role', MAIN_ROLE_ENUM)
        },
        required: true,
        index: true
      }
    },
    aboutInterests: {
      categoryInfo: {
        type: Schema.Types.ObjectId,
        ref: CATEGORY,
        required: true
      },
      subjectInfo: {
        type: Schema.Types.ObjectId,
        ref: SUBJECT,
        required: true
      }
    },

    proficiencyLevel: {
      type: String,
      enum: {
        values: PROFICIENCY_LEVEL_ENUM,
        message: ENUM_CAN_BE_ONE_OF('proficiency level', PROFICIENCY_LEVEL_ENUM)
      },
      required: true
    },
    languages: {
      type: [String],
      enum: {
        values: SPOKEN_LANG_ENUM,
        message: ENUM_CAN_BE_ONE_OF('language', SPOKEN_LANG_ENUM)
      },
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: {
        values: OFFER_STATUS_ENUM,
        message: ENUM_CAN_BE_ONE_OF('offer status', OFFER_STATUS_ENUM)
      },
      default: OFFER_STATUS_ENUM[0],
      index: true
    },

    FAQ: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

offerSchema.index({ 'aboutAuthor.authorRole': 1, languages: 1, status: 1 })

offerSchema.index({ price: 1 })

export default model(OFFER, offerSchema)
