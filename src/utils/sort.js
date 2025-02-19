// Об'єкт для мапінгу ролей
const ROLE_MAP = {
  student: 'tutor',
  tutor: 'student'
}

// Об'єкт для мапінгу типів сортування
const SORT_MAP = {
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
  createdAt: { createdAt: -1 }
}

// Функція сортування за роллю
export const sortByRole = (role) => ROLE_MAP[role] ?? undefined

// Функція сортування за типом
export const sortByType = (type) => SORT_MAP[type] ?? SORT_MAP.createdAt
