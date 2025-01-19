import swaggerJsdoc from 'swagger-jsdoc'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Space2Study-03',
      version: '1.0.0',
      description: 'Space2Study API'
    }
  },
  apis: [path.join(__dirname, '..', 'docs', 'swagger', '*.swagger.js')]
}
export const swaggerSpec = swaggerJsdoc(swaggerOptions)
