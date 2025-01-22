import express from 'express'

import { serverSetup } from './initialization/serverSetup.js'
import { logger } from './logger/logger.js'

const app = express()

const start = async () => {
  try {
    await serverSetup(app)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

start()
