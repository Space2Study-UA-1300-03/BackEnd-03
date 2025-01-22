import * as winston from 'winston'
import 'winston-mongodb'

import { config } from '../configs/config.js'

const { combine, timestamp, json, metadata, errors, prettyPrint } = winston.format
const { MONGODB_URL } = config

export const logger = winston.createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
    metadata(),
    json(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ]
})

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.MongoDB({
      level: 'error',
      db: MONGODB_URL,
      options: { useUnifiedTopology: true },
      expireAfterSeconds: 604800,
      handleExceptions: true
    })
  )
}
