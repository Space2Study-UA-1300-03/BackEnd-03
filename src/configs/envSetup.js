import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const loadEnvConfig = () => {
  const NODE_ENV = process.env?.NODE_ENV || 'development'
  console.log(NODE_ENV, 'NODE_ENV')

  // Спочатку спробуємо знайти .env у корені проекту
  const envFile = NODE_ENV === 'production' ? '.env' : '.env.test.local'
  console.log(envFile, 'envFile')

  // Спробуємо кілька можливих шляхів
  const possiblePaths = [
    path.join(__dirname, '../..', envFile), // Поточний шлях
    path.join(process.cwd(), envFile), // Корінь проекту
    path.join(process.cwd(), 'src', envFile) // Додаткова перевірка (src директорія)
  ]

  let result = { error: new Error('No env file found') }

  // Перевіряємо кожен можливий шлях
  for (const envPath of possiblePaths) {
    console.log(envPath, 'перевірка envPath')

    // Перевіряємо наявність файлу перед спробою його прочитати
    if (fs.existsSync(envPath)) {
      console.log(`Знайдено файл: ${envPath}`)
      result = dotenv.config({ path: envPath })
      break
    }
  }

  // Якщо все ще є помилка, але ми в production, використовуємо системні змінні оточення
  if (result.error && NODE_ENV === 'production') {
    console.log('Файл .env не знайдено, використовуємо системні змінні оточення')
    return process.env
  }

  // В іншому випадку викидаємо помилку
  if (result.error) {
    throw new Error(`Failed to load ${envFile}: ${result.error.message}`)
  }

  console.log(`Environment loaded: ${envFile}`)
  return result.parsed
}
