import mongoose from 'mongoose'
import Category from '#models/category.js'
import { logger } from '#logger/logger.js'
import { config } from '#configs/config.js'
import fs from 'fs'
import path from 'path'

const seedCategories = async () => {
  try {
    logger.info('Starting the seeding process for categories...')
    
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('Connected to MongoDB.')

    const filePath = path.resolve('src/seed/data/categories.json')
    const categories = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    const existingCategories = new Set(
      (await Category.find({}, 'categoryName')).map((cat) => cat.categoryName.toLowerCase())
    )

    for (const category of categories) {
      if (!existingCategories.has(category.categoryName.toLowerCase())) {
        await Category.create(category)
        logger.info(`Category "${category.categoryName}" has been added.`)
      } else {
        logger.info(`Category "${category.categoryName}" already exists.`)
      }
    }

    logger.info('Categories seeding completed successfully.')
  } catch (error) {
    logger.error(`Error while seeding categories: ${error.message}`)
  } finally {
    await mongoose.disconnect()
    logger.info('Disconnected from MongoDB.')
    process.exit()
  }
}

seedCategories()
