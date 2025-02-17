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
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },

    aboutAuthor: {
      author: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true
      },
      authorRole: {
        type: String,
        enum: {
          values: MAIN_ROLE_ENUM,
          message: ENUM_CAN_BE_ONE_OF('author role', MAIN_ROLE_ENUM)
        },
        required: true
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
      }
    },
    languages: {
      type: [String],
      enum: {
        values: SPOKEN_LANG_ENUM,
        message: ENUM_CAN_BE_ONE_OF('language', SPOKEN_LANG_ENUM)
      }
    },

    status: {
      type: String,
      enum: {
        values: OFFER_STATUS_ENUM,
        message: ENUM_CAN_BE_ONE_OF('offer status', OFFER_STATUS_ENUM)
      },
      default: OFFER_STATUS_ENUM[0]
    },

    FAQ: {
      type: [
        {
          question: { type: String },
          answer: { type: String }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

export default model(OFFER, offerSchema)
