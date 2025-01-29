import { serverSetup } from '#initialization/serverSetup.js'
import { logger } from '#src/logger/logger.js'
import request from 'supertest'
import mongoose from 'mongoose'
import express from 'express'

export const connect = async () => {
  const app = express()
  const server = await serverSetup(app)
  return { app: request(app), server }
}

export const closeDatabase = async (server) => {
  logger.info('Closing server')

  if (server) {
    await new Promise((resolve) => server.close(resolve))
  }

  await mongoose.disconnect()
}

export const clearDatabase = async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase()
  }
}
