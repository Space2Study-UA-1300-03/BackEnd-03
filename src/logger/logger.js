import * as winston from 'winston'

const { combine, timestamp, json, metadata, errors, prettyPrint } = winston.format

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
