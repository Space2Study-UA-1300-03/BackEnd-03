import { v4 as uuidv4 } from 'uuid'

export const uniqueFileName = (originalname, id) => `${uuidv4()}//NAME:${originalname}//ID:${id}`
