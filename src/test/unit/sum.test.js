/**
 * @description Checking if jest unit tests are working
 */

const sum = (a, b) => a + b

import { describe, expect, it } from '@jest/globals'

describe('sum function', () => {
  it('return 5', () => {
    const result = sum(2, 3)
    expect(result).toBe(5)
  })

  it('not return null, undefined', () => {
    const result = sum(2, 3)
    expect(result).not.toEqual(0)
    expect(result).not.toBeNull()
    expect(result).not.toBeUndefined()
  })
})
