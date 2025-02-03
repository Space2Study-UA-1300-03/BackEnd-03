import { describe, it, expect } from '@jest/globals'

const { categoryNamesAggregateOptions } = await import('#utils/categories/categoryNamesAggregateOptions.js')

describe('categoryNamesAggregateOptions', () => {
  it('should return correct aggregation pipeline', () => {
    const result = categoryNamesAggregateOptions()

    expect(result).toEqual([
      {
        $lookup: {
          from: 'subjects',
          localField: '_id',
          foreignField: 'category',
          as: 'subjects'
        }
      },
      {
        $match: {
          subjects: { $exists: true, $ne: [] }
        }
      },
      {
        $project: {
          name: 1
        }
      }
    ])
  })

  it('should maintain correct stage order', () => {
    const result = categoryNamesAggregateOptions()

    expect(result[0].$lookup).toBeDefined()
    expect(result[1].$match).toBeDefined()
    expect(result[2].$project).toBeDefined()

    expect(result).toHaveLength(3)
  })

  it('should have correct lookup stage configuration', () => {
    const result = categoryNamesAggregateOptions()
    const lookupStage = result[0].$lookup

    expect(lookupStage).toEqual({
      from: 'subjects',
      localField: '_id',
      foreignField: 'category',
      as: 'subjects'
    })
  })

  it('should have correct match stage configuration', () => {
    const result = categoryNamesAggregateOptions()
    const matchStage = result[1].$match

    expect(matchStage).toEqual({
      subjects: {
        $exists: true,
        $ne: []
      }
    })
  })

  it('should have correct project stage configuration', () => {
    const result = categoryNamesAggregateOptions()
    const projectStage = result[2].$project

    expect(projectStage).toEqual({
      name: 1
    })
  })
})
