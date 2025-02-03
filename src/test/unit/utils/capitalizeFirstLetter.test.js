import { capitalizeFirstLetter } from '#utils/capitalizeFirstLetter.js'
import { describe, expect, it } from '@jest/globals'

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter if it is lowercase', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  it('should return the same string if the first letter is already uppercase', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello')
  })

  it('should return the same string if it is empty', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  it('should throw a TypeError if the input is not a string', () => {
    expect(() => capitalizeFirstLetter(123)).toThrow(TypeError)
    expect(() => capitalizeFirstLetter({})).toThrow(TypeError)
    expect(() => capitalizeFirstLetter([])).toThrow(TypeError)
    expect(() => capitalizeFirstLetter(null)).toThrow(TypeError)
    expect(() => capitalizeFirstLetter(undefined)).toThrow(TypeError)
  })

  it('should return the same string if the first character is not a letter', () => {
    expect(capitalizeFirstLetter('1hello')).toBe('1hello')
    expect(capitalizeFirstLetter('!hello')).toBe('!hello')
  })
})
