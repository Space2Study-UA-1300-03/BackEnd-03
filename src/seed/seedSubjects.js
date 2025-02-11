import mongoose from 'mongoose'
import Subject from '#models/subject.js'
import { logger } from '#logger/logger.js'
import { config } from '#configs/config.js'
import fs from 'fs'
import path from 'path'

const seedSubjects = async () => {
  try {
    logger.info('Starting the seeding process for subjects...')
    
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('Connected to MongoDB.')

    const filePath = path.resolve('src/seed/data/subjects.json')
    const subjects = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    const existingSubjects = new Set(
      (await Subject.find({}, 'subjectName')).map((subj) => subj.subjectName.toLowerCase())
    )

    for (const subject of subjects) {
      if (!existingSubjects.has(subject.subjectName.toLowerCase())) {
        await Subject.create(subject)
        logger.info(`Subject "${subject.subjectName}" has been added.`)
      } else {
        logger.info(`Subject "${subject.subjectName}" already exists.`)
      }
    }

    logger.info('Subjects seeding completed successfully.')
  } catch (error) {
    logger.error(`Error while seeding subjects: ${error.message}`)
  } finally {
    await mongoose.disconnect()
    logger.info('Disconnected from MongoDB.')
    process.exit()
  }
}

seedSubjects()
