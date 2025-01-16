const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Документація для Express API'
    }
  },
  apis: ['./routes/*.js'] // Шлях до файлів з коментарями Swagger
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = { swaggerSpec, swaggerOptions }
