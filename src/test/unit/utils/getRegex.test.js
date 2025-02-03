import { describe, it, expect } from '@jest/globals'
import { getRegex } from '#utils/getRegex.js'

describe('getRegex', () => {
  it('should return correct regex object when a string is provided', () => {
    const result = getRegex('test')
    expect(result).toEqual({ $regex: 'test' })
  })

  it('should return default regex object when an empty string is provided', () => {
    const result = getRegex('')
    expect(result).toEqual({ $regex: '.*' })
  })

  it('should return default regex object when no argument is provided', () => {
    const result = getRegex()
    expect(result).toEqual({ $regex: '.*' })
  })
})
