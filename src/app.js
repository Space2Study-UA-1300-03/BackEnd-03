import { serverSetup } from './initialization/serverSetup.js'
import { loadEnvConfig } from './envSetup.js'
import { logger } from './logger/logger.js'
import express from 'express'

loadEnvConfig()

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
