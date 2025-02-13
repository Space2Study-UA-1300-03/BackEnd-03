import { config } from '#configs/config.js'
import { logger } from '#logger/logger.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = config

const dropAllCollections = async () => {
  const collections = await mongoose.connection.db.collections()
  const areDropped = []
  collections.forEach((collection) => {
    areDropped.push(collection.drop())
  })
  await Promise.all(areDropped)
}

const checkForLocalDB = async () => {
  if (process.env.NODE_ENV === 'development') {
    // await dropAllCollections()
  }
}

export const databaseInitialization = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true
    })
    await checkForLocalDB()
    logger.info('Connected to MongoDB.')
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error)
    throw error
  }
}
