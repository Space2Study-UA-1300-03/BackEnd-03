import { errorMassages } from '#consts/validationError.js'
import { lengths, enums } from '#consts/validation.js'
import { z } from 'zod'

const {
  MIN_OFFER_DESC,
  MIN_OFFER_TITLE,
  MAX_OFFER_DESC,
  MAX_OFFER_TITLE,
  MIN_OFFER_PRISE,
  MAX_OFFER_PRISE,
  MIN_OFFER_FAQ_QUESTION,
  MAX_OFFER_FAQ_ANSWER,
  MAX_OFFER_FAQ_QUESTION,
  MIN_OFFER_FAQ_ANSWER
} = lengths
const { FIELD_IS_SHORTER_THAN_MIN, FIELD_IS_LONGER_THAN_MAX, INVALID_ENUM_TYPE, UNIQUE_LANGUAGES, CORRECT_PRICE } =
  errorMassages
const { SPOKEN_LANG_ENUM, PROFICIENCY_LEVEL_ENUM } = enums

const proficiencyLevelEnum = z.enum(PROFICIENCY_LEVEL_ENUM, INVALID_ENUM_TYPE(PROFICIENCY_LEVEL_ENUM))
const languagesEnum = z.enum(SPOKEN_LANG_ENUM, INVALID_ENUM_TYPE(SPOKEN_LANG_ENUM))

const faqItemSchema = z.object({
  question: z
    .string()
    .min(MIN_OFFER_FAQ_QUESTION, FIELD_IS_SHORTER_THAN_MIN(MIN_OFFER_FAQ_QUESTION))
    .max(MAX_OFFER_FAQ_QUESTION, FIELD_IS_LONGER_THAN_MAX(MAX_OFFER_FAQ_QUESTION)),
  answer: z
    .string()
    .min(MIN_OFFER_FAQ_ANSWER, FIELD_IS_SHORTER_THAN_MIN(MIN_OFFER_FAQ_ANSWER))
    .max(MAX_OFFER_FAQ_ANSWER, FIELD_IS_LONGER_THAN_MAX(MAX_OFFER_FAQ_ANSWER))
})

const uniqueArray = (arr) => arr.length === new Set(arr).size

export const createOfferValidationSchema = z.object({
  title: z
    .string()
    .min(MIN_OFFER_TITLE, FIELD_IS_SHORTER_THAN_MIN(MIN_OFFER_TITLE))
    .max(MAX_OFFER_TITLE, FIELD_IS_LONGER_THAN_MAX(MAX_OFFER_TITLE))
    .toLowerCase()
    .trim(),

  description: z
    .string()
    .min(MIN_OFFER_DESC, FIELD_IS_SHORTER_THAN_MIN(MIN_OFFER_DESC))
    .max(MAX_OFFER_DESC, FIELD_IS_LONGER_THAN_MAX(MAX_OFFER_DESC))
    .toLowerCase()
    .trim(),

  price: z
    .number()
    .positive()
    .min(MIN_OFFER_PRISE, CORRECT_PRICE(MIN_OFFER_PRISE, MAX_OFFER_PRISE))
    .max(MAX_OFFER_PRISE, CORRECT_PRICE(MIN_OFFER_PRISE, MAX_OFFER_PRISE)),

  categoryId: z.string().toLowerCase().trim(),
  subjectId: z.string().toLowerCase().trim(),

  proficiencyLevel: proficiencyLevelEnum,
  languages: z
    .array(languagesEnum)
    .min(1, FIELD_IS_SHORTER_THAN_MIN(1))
    .max(languagesEnum.lengths, FIELD_IS_LONGER_THAN_MAX(languagesEnum.lengths))
    .refine(uniqueArray, UNIQUE_LANGUAGES),

  faq: z.array(faqItemSchema).optional()
})
