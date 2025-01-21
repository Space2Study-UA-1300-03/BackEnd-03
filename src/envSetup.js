import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const loadEnvConfig = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development'
  const envFile = NODE_ENV === 'production' ? '.env.local' : '.env.test.local'
  const envPath = path.join(__dirname, '..', envFile)
  const result = dotenv.config({ path: envPath })

  if (result.error) throw new Error(`Failed to load ${envFile}: ${result.error.message}`)

  console.log(`Environment loaded: ${envFile}`)
}
