import { config } from '#configs/config.js'
import { logger } from '#logger/logger.js'
import mongoose from 'mongoose'

const dropAllCollections = async () => {
  const collections = await mongoose.connection.db.collections()
  const areDropped = []
  collections.forEach((collection) => {
    areDropped.push(collection.drop())
  })
  await Promise.all(areDropped)
}

const checkForLocalDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    await dropAllCollections()
  }
}

export const databaseInitialization = async () => {
  const MONGODB_URL = config.all.MONGODB_URL

  await mongoose.connect(MONGODB_URL)
  await checkForLocalDB()
  logger.info('Connected to MongoDB.')
}
