import { createNotFoundError } from '#utils/errorsHelper.js'
import { swaggerSpec } from '#initialization/swagger.js'
import { errorMiddleware } from '#middlewares/error.js'
import { config } from '#configs/config.js'
import swaggerUi from 'swagger-ui-express'
import { router } from '#routes/index.js'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

export const initialization = (app) => {
  const CLIENT_URL = config.all.CLIENT_URL

  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'development' ? true : CLIENT_URL,
      credentials: true,
      methods: 'GET, POST, PATCH, DELETE',
      allowedHeaders: 'Content-Type, Authorization'
    })
  )

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use('/', router)

  app.use((_req, _res, next) => {
    next(createNotFoundError())
  })

  app.use(errorMiddleware)
}
